const mongoose=require("mongoose");
exports.connectDatabase= async()=>{
    try {
        await mongoose.connect(process.env.Database_URL);
        console.log(`Database Connetion established `);
    } catch (error) {
        console.log(error);
    }
};