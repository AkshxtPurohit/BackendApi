const mongoose = require("mongoose");

const internshipModel = new mongoose.Schema(
    {
        students:[{type:mongoose.Schema.Types.ObjectId,ref:"student"}],
        emlopyes:{type:mongoose.Schema.Types.ObjectId,ref:"employe"},
        profile: String,
        skill: String,
        intrenshipType: {
            type: String,
            enum: ["On site", "Remote", "Hybrid"]
        },
        openings: Number,
        start: String,
        from:String,
        to:String,
        duration: String,
        resposiblity: String,
        stipend:{status:{type:String,enum:["Fixed","Negotiable","Preformance Based","Unpaid"]},amount:Number},
        perks:String,
        Assesments:String,

    },
    { timestamps: true }
)




const Internship = mongoose.model("internship", internshipModel);
module.exports = Internship;