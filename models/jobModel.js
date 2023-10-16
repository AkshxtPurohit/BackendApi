const mongoose = require("mongoose");

const jobModel = new mongoose.Schema(
    {
        students:[{type:mongoose.Schema.Types.ObjectId,ref:"student"}],
        emlopyes:{type:mongoose.Schema.Types.ObjectId,ref:"employe"},
        profile: String,
        skill: String,
        jobType: {
            type: String,
            enum: ["On site", "Remote", "Hybrid"]
        },
        openings: Number,
        description:String,
        prefrences:String,
        salary:Number,
        resposiblity: String,
        // stipend:{type:String,enum:["Fixed","Negotiable","Preformance Based","Unpaid"],amount:Number},
        perks:String,
        Assesments:String,

    },
    { timestamps: true }
)




const Job = mongoose.model("job", jobModel);
module.exports = Job;