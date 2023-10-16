const Employe = require("../models/employeeModlel");
const ErrorHandler = require("../utils/ErrorHandler");
const {catchAsyncErrors}=require("../middleware/catchAsyncErro");
const { sendToken } = require("../utils/sendToken");
const { sendmail } = require("../utils/nodemailer");
const path = require("path");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const imagekit=require("../utils/imageKit").initImgeKit();

exports.employesignup=catchAsyncErrors(async(req,res,next)=>{
    const employe=await new Employe(req.body).save();
    // console.log(employe);
    sendToken(employe,201,res);
    res.status(201).json(employe);
})

exports.employesignin=catchAsyncErrors(async(req,res,next)=>{
    const employe=await Employe.findOne({email:req.body.email}).select("+password").exec();
    if(!employe) return next(new ErrorHandler("User Not Found with this email address",404));
    
    const isMatch=employe.comparepassword(req.body.password);
    if(!isMatch) return next(new ErrorHandler("Wrong Credentials",500));
    sendToken(employe,200,res);

    res.json({employe});
})

exports.employesignout=catchAsyncErrors(async(req,res,next)=>{
    res.clearCookie("token");
    res.json({message:"Successfully Singnout!"});
})


exports.employesend_mail=catchAsyncErrors(async(req,res,next)=>{
    res.clearCookie("token");
    const employe =await Employe.findOne({email:req.body.email}).exec();
    if(!employe) return next(new ErrorHandler("User Not Found with this email address",404));

    const url=`${req.protocol}://${req.get("host")}/employe/forget_link/${employe._id}`;
    // console.log(url);
    sendmail(req,res,next,url);
    employe.resetPasswordToken="1";
    await employe.save();
    res.json({message:url});
})

exports.employe_forget_link=catchAsyncErrors(async(req,res,next)=>{
    const employe=await Employe.findById(req.params.id).exec();
    if(!employe) return next(new ErrorHandler("User Not Found with this email address",404));
    if(employe.resetPasswordToken=="1"){
        employe.resetPasswordToken="0";
        employe.password=req.body.password;
        await employe.save();
    } else{
        return next(new ErrorHandler("Invalid Reset Password Link! Please try again",500))
    }
    
    res.status(200).json({
        message:"Password is sucessfully changed"
    });


})

exports.reset_password=catchAsyncErrors(async(req,res,next)=>{
    const employe=await Employe.findById(req.id).exec();
    // console.log(employe);
    employe.password=req.body.password;
    await employe.save();
    
    
    res.status(200).json({
        message:"Password is sucessfully reset"
    });


})


exports.employe_update=catchAsyncErrors(async(req,res,next)=>{
    await Employe.findByIdAndUpdate(req.params.employeId,req.body).exec();
    res.status(200).json({
        success:true,
        message:"employe details updated",
    });
})



exports.employe_avatar=catchAsyncErrors(async(req,res,next)=>{
    const file=req.files.orglogo;
    const employe= await Employe.findById(req.params.employeId).exec();
    const modified_name=`resumebuilder-${Date.now()}${path.extname(file.name)}`;
    if(employe.orglogo.fileId !==""){
        await imagekit.deleteFile(employe.orglogo.fileId);
    }
    const {fileId,url}=await imagekit.upload({file:file.data,fileName:modified_name});
    employe.orglogo={fileId,url};
    await employe.save();
    res.json({employe});
})

//-------------------------------------------------Internship---------------------------------------

exports.createIntern=catchAsyncErrors(async(req,res,next)=>{
    const employe=await Employe.findById(req.id).exec();

    const intern=await new Internship(req.body).save();
    intern.emlopyes=employe._id;
    employe.internship.push(intern._id);
    await intern.save();
    await employe.save();
    // console.log(intern);
    res.status(201).json(intern);
})

exports.readIntern=catchAsyncErrors(async(req,res,next)=>{
    const {internship}=await Employe.findById(req.id).populate("internship").exec();
    // const interns=await Internship.find().exec();
    // console.log(intern);
    res.status(200).json(internship);
})

exports.readSingleIntern=catchAsyncErrors(async(req,res,next)=>{
    const intern=await Internship.findById(req.params.id).exec();
    // console.log(inten);
    // if(!intern) return new ErrorHandler("Inernship Not Found");
    res.status(200).json(intern);
})

//-----------------------------------------Jobs------------------------------

exports.createJob=catchAsyncErrors(async(req,res,next)=>{
    const employe=await Employe.findById(req.id).exec();

    const job=await new Job(req.body).save();
    job.emlopyes=employe._id;
    employe.jobs.push(job._id);
    await job.save();
    await employe.save();
    // console.log(job);
    res.status(201).json(job);
})

exports.readJob=catchAsyncErrors(async(req,res,next)=>{
    const {jobship}=await Employe.findById(req.id).populate("jobs").exec();
    // const jobs=await jobship.find().exec();
    // console.log(job);
    res.status(200).json(jobship);
})

exports.readSingleJob=catchAsyncErrors(async(req,res,next)=>{
    const job=await Job.findById(req.params.id).exec();
    // console.log(inten);
    // if(!job) return new ErrorHandler("Inernship Not Found");
    res.status(200).json(job);
})
