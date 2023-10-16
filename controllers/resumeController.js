const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("../middleware/catchAsyncErro");
const { v4: uuidv4 } = require("uuid");

exports.resume = catchAsyncErrors(async (req, res, next) => {
    console.log(req.id);
    const { resume } = await Student.findById(req.id).exec();
    res.json({ message: "got it", resume });
})


//---------------------------------EDUCATION---------------------------------------------

exports.addeducation = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.id);
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({...req.body,id:uuidv4});

    await Student.save();

    res.json({ message: "got it", resume });
})

exports.editeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const Index=student.resume.education.findIndex(i=> i.id===req.params.eduid);
    student.resume.education[Index]={...student.resume.education[Index],...req.body};
    await Student.save();

    res.json({ message: "got it", resume });
})


exports.deleteeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredu=student.resume.education.filter(i=> i.id===req.params.eduid);
    student.resume.education=filteredu;
    await Student.save();

    res.json({ message: "got it", resume });
})

//------------------------------------ JOBS-----------------------------------------------------

exports.addJobs = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.id);
    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({...req.body,id:uuidv4});

    await Student.save();

    res.json({ message: "got it", resume });
})

exports.editJobs = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const Index=student.resume.jobs.findIndex(i=> i.id===req.params.jobid);
    student.resume.jobs[Index]={...student.resume.jobs[Index],...req.body};
    await Student.save();

    res.json({ message: "got it", resume });
})


exports.deleteJobs = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredu=student.resume.jobs.filter(i=> i.id===req.params.jobid);
    student.resume.jobs=filteredu;
    await Student.save();

    res.json({ message: "got it", resume });
})

//-------------------------------------- INTERNSHIPS------------------------------------

exports.addIntern = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.id);
    const student = await Student.findById(req.id).exec();
    student.resume.internship.push({...req.body,id:uuidv4});

    await Student.save();

    res.json({ message: "got it", resume });
})

exports.editIntern = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const Index=student.resume.internship.findIndex(i=> i.id===req.params.internid);
    student.resume.internship[Index]={...student.resume.internship[Index],...req.body};
    await Student.save();

    res.json({ message: "got it", resume });
})


exports.deleteIntern = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filter=student.resume.internship.filter(i=> i.id===req.params.internid);
    student.resume.internship=filter;
    await Student.save();

    res.json({ message: "got it", resume });
})

//----------------------------------------------RESPONSIBLITY---------------------------------

exports.addRespo = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.id);
    const student = await Student.findById(req.id).exec();
    student.resume.responsiblities.push({...req.body,id:uuidv4});

    await Student.save();

    res.json({ message: "got it", resume });
})

exports.editRespo = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const Index=student.resume.responsiblities.findIndex(i=> i.id===req.params.respoid);
    student.resume.responsiblities[Index]={...student.resume.responsiblities[Index],...req.body};
    await Student.save();

    res.json({ message: "got it", resume });
})


exports.deleteRespo = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filter=student.resume.responsiblities.filter(i=> i.id===req.params.respoid);
    student.resume.responsiblities=filter;
    await Student.save();

    res.json({ message: "got it", resume });
})

//------------------------------------------------COURESE---------------------------------------


exports.addCour = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.id);
    const student = await Student.findById(req.id).exec();
    student.resume.courses.push({...req.body,id:uuidv4});

    await Student.save();

    res.json({ message: "got it", resume });
})

exports.editCour = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const Index=student.resume.courses.findIndex(i=> i.id===req.params.courseid);
    student.resume.courses[Index]={...student.resume.courses[Index],...req.body};
    await Student.save();

    res.json({ message: "got it", resume });
})


exports.deleteCour = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filter=student.resume.courses.filter(i=> i.id===req.params.courseid);
    student.resume.courses=filter;
    await Student.save();

    res.json({ message: "got it", resume });
})


//-------------------------------------- PROJECTS----------------------------------------

exports.addProj = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.id);
    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({...req.body,id:uuidv4});

    await Student.save();

    res.json({ message: "got it", resume });
})

exports.editProj = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const Index=student.resume.projects.findIndex(i=> i.id===req.params.projid);
    student.resume.projects[Index]={...student.resume.projects[Index],...req.body};
    await Student.save();

    res.json({ message: "got it", resume });
})


exports.deleteProj = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filter=student.resume.projects.filter(i=> i.id===req.params.projid);
    student.resume.projects=filter;
    await Student.save();

    res.json({ message: "got it", resume });
})

//-----------------------------------------SKILLS-------------------------------------------

exports.addSkill = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.id);
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({...req.body,id:uuidv4});

    await Student.save();

    res.json({ message: "got it", resume });
})

exports.editSkill = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const Index=student.resume.skills.findIndex(i=> i.id===req.params.skillid);
    student.resume.skills[Index]={...student.resume.skills[Index],...req.body};
    await Student.save();

    res.json({ message: "got it", resume });
})


exports.deleteSkill = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filter=student.resume.skills.filter(i=> i.id===req.params.skillid);
    student.resume.skills=filter;
    await Student.save();

    res.json({ message: "got it", resume });
})


//---------------------------------------- ACCOMPLISHMENT-------------------------------------


exports.addAccomp = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.id);
    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({...req.body,id:uuidv4});

    await Student.save();

    res.json({ message: "got it", resume });
})

exports.editAccomp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const Index=student.resume.accomplishments.findIndex(i=> i.id===req.params.acompid);
    student.resume.accomplishments[Index]={...student.resume.accomplishments[Index],...req.body};
    await Student.save();

    res.json({ message: "got it", resume });
})


exports.deleteAccomp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filter=student.resume.accomplishments.filter(i=> i.id===req.params.acompid);
    student.resume.accomplishments=filter;
    await Student.save();

    res.json({ message: "got it", resume });
})
