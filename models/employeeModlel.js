const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const emolyeModel = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "First Name is required"],
            minLenght: [4, "First Name should atleat have 4 Character"],
        },
        lastname: {
            type: String,
            required: [true, "Last Name is required"],
            minLenght: [4, "Last Name should atleat have 4 Character"],
        },
        contact: {
            type: String,
            required: [true, "Contact info is required"],
            maxLength: [10, "Enter Correct Contact No."],
            minLength: [10, "Enter Correct Contact No."],
        },

        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password: {
            type: String,
            select: false,
            maxLength: [15, "Password Should Not Exceed more than 15 Character"],
            minLength: [8, "Password Should have atlest 8 Character"],
            // match:[]

        },
        resetPasswordToken: {
            type: String,
            default: "0"
        },
        orgname: {
            type: String,
            required: [true, "Organization Name is required"],
            minLenght: [4, "Organization Name should atleat have 4 Character"],
        },
        orglogo: {
            type: Object,
            default: {
                fileId: '',
                url: "https://images.unsplash.com/photo-1535551951406-a19828b0a76b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1166&q=80"
            }
        },
        internship: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'internship' }
        ],
        jobs: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'job' }
        ],

    },
    { timestamps: true }
)

emolyeModel.pre("save", function () {
    if (!this.isModified("password")) return;

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

emolyeModel.methods.comparepassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}
emolyeModel.methods.getjwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
}

const Employe = mongoose.model("employe", emolyeModel);
module.exports = Employe;