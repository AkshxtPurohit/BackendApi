exports.generatedErrors=(err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    if(err.name==="MongoServerError" && err.message.includes("E1100 duplicate key") ){
        err.message="Email address already exixts";
    }
    res.status(statusCode).json({
        message:err.message,
        errName:err.name,
        errStack:err.stack
    })
}