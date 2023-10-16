const express=require("express");
const router=express.Router();
const {resume,addeducation,editeducation,deleteeducation,addJobs,editJobs,deleteJobs,addIntern,editIntern,deleteIntern,addRespo,editRespo,deleteRespo,addCour,editCour,deleteCour,addProj,editProj,deleteProj,addSkill,editSkill,deleteSkill,addAccomp,editAccomp,deleteAccomp}=require("../controllers/resumeController");
const { isAuthenticated } = require("../middleware/auth");


//--------------------------------------  EDUCATION  -----------------------------------   
// Get/
router.get("/",isAuthenticated,resume);

//Post
router.post("/add-edu",isAuthenticated,addeducation)

//Post
router.post("/edit-edu/:eduid",isAuthenticated,editeducation)

//Post
router.post("/delete-edu/:eduid",isAuthenticated,deleteeducation)


//--------------------------------------  JOBS  -----------------------------------  

//Post
router.post("/add-job",isAuthenticated,addJobs)

//Post
router.post("/edit-job/:jobid",isAuthenticated,editJobs)

//Post
router.post("/delete-job/:jobid",isAuthenticated,deleteJobs)

//-------------------------------------- INTERNSHIPS------------------------------------
//
//Post
router.post("/add-intern",isAuthenticated,addIntern)

//Post
router.post("/edit-intern/:internid",isAuthenticated,editIntern)

//Post
router.post("/delete-intern/:internid",isAuthenticated,deleteIntern)


//----------------------------------------------RESPONSIBLITY---------------------------------
//
//Post
router.post("/add-respo",isAuthenticated,addRespo)

//Post
router.post("/edit-respo/:respoid",isAuthenticated,editRespo)

//Post
router.post("/delete-respo/:respoid",isAuthenticated,deleteRespo)

//------------------------------------------------COURESE---------------------------------------
//
//Post
router.post("/add-course",isAuthenticated,addCour)

//Post
router.post("/edit-course/:courseid",isAuthenticated,editCour)

//Post
router.post("/delete-course/:courseid",isAuthenticated,deleteCour)


//-------------------------------------- PROJECTS----------------------------------------
//
//Post
router.post("/add-proj",isAuthenticated,addProj)

//Post
router.post("/edit-proj/:projid",isAuthenticated,editProj)

//Post
router.post("/delete-proj/:projid",isAuthenticated,deleteProj)


//-----------------------------------------SKILLS-------------------------------------------
//
//Post
router.post("/add-skill",isAuthenticated,addSkill)

//Post
router.post("/edit-skill/:skillid",isAuthenticated,editSkill)

//Post
router.post("/delete-skill/:skillid",isAuthenticated,deleteSkill)


//---------------------------------------- ACCOMPLISHMENT-------------------------------------
//
//Post
router.post("/add-accomp",isAuthenticated,addAccomp)

//Post
router.post("/edit-accomp/:accompid",isAuthenticated,editAccomp)

//Post
router.post("/delete-accomp/:accompid",isAuthenticated,deleteAccomp)



module.exports=router;