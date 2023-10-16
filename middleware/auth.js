const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("./catchAsyncErro");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return next(new ErrorHandler("Please Login to access the resource", 401));
    // const i=jwt.verify(token,process.env.JWT_SECRET);
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(id);
    req.id = id;
    // res.json({id,token});
    next();

    // console.log(i);
})