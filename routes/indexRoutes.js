const express=require("express");
const router=express.Router();
const {isAuthenticated}=require("../middleware/auth")
const {homepage,studentsignup,studentsignin,studentsignout,studentsend_mail,student_forget_link,reset_password,student_update,student_avatar,applyInternship,applyJob}=require("../controllers/indexController");
const Student = require("../models/studentModel");

// homepage isAuthenticated
router.get("/",homepage);

// Post/student/signup
// Post/student/signup
router.post("/student/signup",studentsignup);

// Post/student/signin
router.post("/student/signin",studentsignin);

// Get/student/signout
router.get("/student/signout" , isAuthenticated, studentsignout);

// Post/student/send-mail
router.post("/student/forget/send_mail",studentsend_mail);

// Get/student/forget_link
router.get("/student/forget_link/:id" , student_forget_link);

// Post/student/reset_password
router.post("/student/reset_password", isAuthenticated, reset_password);

// Post/student/Update/:studentId
router.post("/student/update/:studentId", isAuthenticated,student_update);

// Post/student/Update/:studentId
router.post("/student/avatar/:studentId", isAuthenticated,student_avatar);

//------------------------------------------- apply Intenship-----------------------------

// Post/student/apply/:internshipId
router.post("/student/apply/:internshipId", isAuthenticated ,applyInternship);




//--------------------------------------------apply Jobs---------------------------------

// Post/student/apply/:jobId
router.post("/student/apply/:jobId", isAuthenticated,applyJob);

module.exports=router;