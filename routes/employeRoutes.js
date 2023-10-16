const express=require("express");
const router=express.Router();
const {isAuthenticated}=require("../middleware/auth")
const {employesignup,employesignin,employesignout,employesend_mail,employe_forget_link,reset_password,employe_update,employe_avatar,createIntern,readIntern,readSingleIntern,createJob,readJob,readSingleJob}=require("../controllers/employeController");
const Employe = require("../models/employeeModlel");

// homepage isAuthenticated

// Post/employe/signup
// Post/employe/signup
router.post("/signup",employesignup);

// Post/employe/signin
router.post("/signin",employesignin);

// Get/employe/signout
router.get("/signout" , isAuthenticated, employesignout);

// Post/send-mail
router.post("/send_mail",employesend_mail);

// Get/forget_link
router.get("/forget_link/:id" , employe_forget_link);

// Post/reset_password
router.post("/reset_password", isAuthenticated, reset_password);

// Post/Update/:employeId
router.post("/update/:employeId", isAuthenticated,employe_update);

// Post/Update/:employeId
router.post("/avatar/:employeId", isAuthenticated,employe_avatar);


//--------------------------------------Internship------------------------------------------
// Post/employe/internship/create
router.post("/internship/create", isAuthenticated,createIntern);

// Post/employe/internship/read
router.post("/internship/read", isAuthenticated,readIntern);

// Post/employe/internship/read
router.post("/internship/read/:id", isAuthenticated,readSingleIntern);

//--------------------------------------Jobs------------------------------------------

//
// Post/employe/jobs/create
router.post("/jobs/create", isAuthenticated,createJob);

// Post/employe/jobs/read
router.post("/jobs/read", isAuthenticated,readJob);

// Post/employe/jobs/read
router.post("/jobs/read/:id", isAuthenticated,readSingleJob);


module.exports=router;