const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const studentModel= new mongoose.Schema(
    {
        firstname:{
            type:String,
            required:[true,"First Name is required"],
            minLenght:[4,"First Name should atleat have 4 Character"],
        },
        lastname:{
            type:String,
            required:[true,"Last Name is required"],
            minLenght:[4,"Last Name should atleat have 4 Character"],
        },
        contact:{
            type:String,
            required:[true,"Contact info is required"],
            maxLength:[10,"Enter Correct Contact No."],
            minLength:[10,"Enter Correct Contact No."],
        },
        city:{
            type:String,
            required:[true,"City is required"],
        },
        gender:{
            type:String,
            enum:["Male" , "Female" , "Others"]
        },

        email:{
            type:String,
            unique:true,
            required:[true,"Email is required"],
            match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password:{
            type:String,
            select:false,
            maxLength:[15,"Password Should Not Exceed more than 15 Character"],
            minLength:[8,"Password Should have atlest 8 Character"],
            
        },
        resetPasswordToken:{
            type:String,
            default:"0"
        },
        avatar:{
            type:Object,
            default:{
                fileId:'',
                url:"https://images.unsplash.com/photo-1535551951406-a19828b0a76b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1166&q=80"
            }
        },
        resume:{
            education:[],
            jobs:[],
            internship:[],
            responsiblities:[],
            courses:[],
            projects:[],
            skills:[],
            accomplishments:[]
        },
        internship: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'internship' }
        ],
        jobs: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'job' }
        ],

    },
    {timestamps:true}
)

studentModel.pre("save",function(){
    if(!this.isModified("password")) return ;

    let salt= bcrypt.genSaltSync(10);
    this.password=bcrypt.hashSync(this.password, salt);
})

studentModel.methods.comparepassword=function(password){
    return bcrypt.compareSync(password,this.password);
}
studentModel.methods.getjwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
}

const Student=mongoose.model("student",studentModel);
module.exports=Student;