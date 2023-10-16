const Student = require("../models/studentModel");
const Intenship = require("../models/internshipModel");

const ErrorHandler = require("../utils/ErrorHandler");
const {catchAsyncErrors}=require("../middleware/catchAsyncErro");
const { sendToken } = require("../utils/sendToken");
const { sendmail } = require("../utils/nodemailer");
const path = require("path");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const imagekit=require("../utils/imageKit").initImgeKit();

exports.homepage=catchAsyncErrors(async(req,res,next)=>{
    res.status(201).json("secured homepage");
})

exports.studentsignup=catchAsyncErrors(async(req,res,next)=>{
    const student=await new Student(req.body).save();
    // console.log(student);
    sendToken(student,201,res);
    res.status(201).json(student);
})

exports.studentsignin=catchAsyncErrors(async(req,res,next)=>{
    const student=await Student.findOne({email:req.body.email}).select("+password").exec();
    if(!student) return next(new ErrorHandler("User Not Found with this email address",404));
    
    const isMatch=student.comparepassword(req.body.password);
    if(!isMatch) return next(new ErrorHandler("Wrong Credentials",500));
    
    sendToken(student,200,res);
    // res.status(200).json({student});
})

exports.studentsignout=catchAsyncErrors(async(req,res,next)=>{
    res.clearCookie("token");
    res.json({message:"Successfully Singnout!"});
})


exports.studentsend_mail=catchAsyncErrors(async(req,res,next)=>{
    res.clearCookie("token");
    const student =await Student.findOne({email:req.body.email}).exec();
    if(!student) return next(new ErrorHandler("User Not Found with this email address",404));

    const url=`${req.protocol}://${req.get("host")}/student/forget_link/${student._id}`;
    // console.log(url);
    sendmail(req,res,next,url);
    student.resetPasswordToken="1";
    await student.save();
    res.json({message:url});
})

exports.student_forget_link=catchAsyncErrors(async(req,res,next)=>{
    const student=await Student.findById(req.params.id).exec();
    if(!student) return next(new ErrorHandler("User Not Found with this email address",404));
    if(student.resetPasswordToken=="1"){
        student.resetPasswordToken="0";
        student.password=req.body.password;
        await student.save();
    } else{
        return next(new ErrorHandler("Invalid Reset Password Link! Please try again",500))
    }
    
    res.status(200).json({
        message:"Password is sucessfully changed"
    });


})

exports.reset_password=catchAsyncErrors(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec();
    console.log(student);
    student.password=req.body.password;
    await student.save();
    
    
    res.status(200).json({
        message:"Password is sucessfully reset"
    });


})


exports.student_update=catchAsyncErrors(async(req,res,next)=>{
    await Student.findByIdAndUpdate(req.params.studentId,req.body).exec();
    res.status(200).json({
        success:true,
        message:"Student details updated",
    });
})



exports.student_avatar=catchAsyncErrors(async(req,res,next)=>{
    const file=req.files.avatar;
    const student= await Student.findById(req.params.studentId).exec();
    const modified_name=`resumebuilder-${Date.now()}${path.extname(file.name)}`;
    if(student.avatar.fileId !==""){
        await imagekit.deleteFile(student.avatar.fileId);
    }
    const {fileId,url}=await imagekit.upload({file:file.data,fileName:modified_name});
    student.avatar={fileId,url};
    await student.save();
    res.json({student});
})

//---------------------------------  Intenship   ---------------------------------

exports.applyInternship=catchAsyncErrors(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec();
    const intern= await Internship.findById(req.params.internshipId);
    student.internship.push(internship._id);
    intern.students.push(student._id);
    await student.save();
    await intern.save();

    res.json({student});
})


//---------------------------------  Job   ---------------------------------



exports.applyJob=catchAsyncErrors(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec();
    const job= await Job.findById(req.params.jobId);
    student.jobs.push(job._id);
    job.students.push(student._id);
    await student.save();
    await job.save();

    res.json({student});
})