import mongoose, { Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        minLength: [3,"First Name must contin At Lest 3 CCharacters!"]
    },
    lastName:{
        type: String,
        required:true,
        minLength: [3,"Last Name must contin At Lest 3 Characters!"]
    },
    email:{
        type: String,
        required:true,
        validate:[validator.isEmail, "Please provide a valid Email!"]
    },
    phone:{
        type: String,
        required:true,
        minLength: [10,"Phone Number must contin Exact 10 Digits!"],
        maxLength: [10,"Phone Number must contin Exact 10 Digits!"]
    },
    nic:{
        type: String,
        required:true,
        minLength: [9,"NIC Number must contin Exact 9 Digits!"],
        maxLength: [12,"NIC Number must contin Exact 12 Digits!"]
        
    },
    dob:{
        type :Date,
        required :[true, "dob is required!"]
    },
    gender:{
        type:String,
        required :true,
        enum : ["male","female"],
    },
    password:{
        type: String,
        required:true,
        minLength: [8,"Password must contin At Least 8 Characters!"],
        select :false
    },
    role:{
        type :String,
        required:true,
        enum:["Admin","Patient","Doctor"]
    },
    doctorDepartment:{
        type:String,
    },
    docAvatar:{
        public_id : String,
        url :String
    }
})


userSchema.pre("save",async function(next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.comparePassword = async function (enterdPassword) {
    return await bcrypt.compare(enterdPassword,this.password)
}
userSchema.methods.generateJsonwebToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES,
    })
}

export const User = mongoose.model("User", userSchema);