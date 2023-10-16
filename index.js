require("dotenv").config({path:"./.env"});
const express=require("express");
const app=express();
const cors = require('cors');


// app.use(cors());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// Database

require("./models/database").connectDatabase();

//morgan 

const morgan = require("morgan");
app.use(morgan("tiny"));
 
// bodyparser

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//session

const session=require("express-session");
const cookieParser=require("cookie-parser");

app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:process.env.EXPRESS_SESSON_SECRET
}))
app.use(cookieParser());

//express file upload

const fileupload=require("express-fileupload");
app.use(fileupload());

// ImageKit



// app.get()
app.use("/",require("./routes/indexRoutes"));
app.use("/resume",require("./routes/resumeRoutes"));
app.use("/employe",require("./routes/employeRoutes"));

// Error Handler
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middleware/error");
app.all("*",(res,req,next)=>{
    next(new ErrorHandler(`Requested URL Not Found ${req.url}`,404));
});
app.use(generatedErrors);


//server
app.listen(
    process.env.PORT,
    console.log(`Server is running on port ${process.env.PORT}`)
)