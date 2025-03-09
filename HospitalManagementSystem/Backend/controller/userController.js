import {chatchAsyncErrors} from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from '../middlewares/errorMiddleware.js'
import { User } from '../models/userSchema.js';
import {generateToken} from "../utils/jwtToken.js"
import bcrypt from 'bcrypt'; 
import fs from 'fs';
import path from 'path';

export const patientRegister = chatchAsyncErrors(async(req,res,next)=>{
    const{
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role
    } = req.body;
    if(!firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !password ||
        !role){
            return next(new ErrorHandler("please fill full form!",400))
        }
        let user = await User.findOne({email});
        if(user){
            return next(new ErrorHandler("User already Registered!",400))
        }
        user = await User.create({firstName,
            lastName,
            email,
            phone,
            nic,
            dob,
            gender,
            password,
            role
        })
            generateToken(user,"User Registerd!",200,res);
            
})

export const login = chatchAsyncErrors(async(req,res,next)=>{
    const {email,password,confirmPassword,role} =req.body
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("please fill full form",400))
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("password and confirm password do not match!",400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("invalid email or password!",400))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid email or password!",400))
    }
    if(role !== user.role){
        return next(new ErrorHandler("User with this role not found!",400))
    }
    generateToken(user,"User Login Successfully!",200,res);
})

export const addNewAdmin = chatchAsyncErrors(async(req,res,next)=>{
    const{
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
    } = req.body;
    if(!firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !password)
        {
            return next(new ErrorHandler("please fill full form!",400))
        }
        const isRegistered = await User.findOne({email});
        if(isRegistered){
            return next(new ErrorHandler(`${isRegistered.role}Admin with this email already existst!`))
        }
        const admin = await User.create({firstName,
            lastName,
            email,
            phone,
            nic,
            dob,
            gender,
            password,
            role: "Admin",
        })
        res.status(200).json({
            success : true,
            message : "new Admin registered!"
        })
})

export const getAllDoctors = chatchAsyncErrors(async(req,res,next)=>{
    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({
        success : true,
        doctors,
    })
})
export const getAllUser = chatchAsyncErrors(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success : true,
        user,
    })
    
})

export const logoutAdmin = chatchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("adminToken","",{
        httpOnly : true,
        expires : new Date(Date.now())
    }).json({
        success : true,
        message : "Admin logout successfully!"
    })
})

export const logoutPatient = chatchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("patientToken","",{
        httpOnly : true,
        expires : new Date(Date.now())
    }).json({
        success : true,
        message : "Patient logout successfully!"
    })
})

const uploadDir = path.resolve('./public/uploads/doctors');

export const addNewDoctor = chatchAsyncErrors(async (req, res, next) => {
    // Check if the image is provided
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor image required!", 400));
    }

    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    
    // Check if the file format is allowed
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File format not supported!", 400));
    }

    const { 
        firstName, 
        lastName, 
        email, 
        phone, 
        nic, 
        dob, 
        gender, 
        password, 
        doctorDepartment 
    } = req.body;

    // Check if all required fields are provided
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !doctorDepartment) {
        return next(new ErrorHandler("Please provide full details", 400));
    }

    // Check if the user is already registered
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email`, 400));
    }

    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    try {
        // Generate a unique filename and save the image to the local folder
        const fileName = `${Date.now()}-${docAvatar.name}`;
        const savePath = path.join(uploadDir, fileName);
        
        // Move the uploaded file to the local folder
        await docAvatar.mv(savePath);

        // Hash the password before saving to the database (recommended)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new doctor in the database
        const doctor = await User.create({
            firstName,
            lastName,
            email,
            phone,
            nic,
            dob,
            gender,
            password: hashedPassword,
            doctorDepartment,
            role: "Doctor",
            docAvatar: {
                url: `/uploads/doctors/${fileName}` // Store the relative path to the file
            }
        });

        // Respond with success
        res.status(200).json({
            success: true,
            message: "New Doctor Registered!",
            doctor
        });
    } catch (err) {
        console.log(err)
        return next(new ErrorHandler("Error saving the doctor details", 500));
    }
});


export const deleteDoctor = chatchAsyncErrors(async (req, res, next) => {
    const { id } = req.params; 

    const doctor = await User.findById(id);

    if (!doctor) {
        return next(new ErrorHandler("Doctor not found", 404));
    }


    const imagePath = path.resolve(`./public${doctor.docAvatar.url}`);

   
    try {
        fs.unlinkSync(imagePath); 
    } catch (error) {
        console.error("Error deleting image:", error);
    }

   
    await User.findByIdAndDelete(id);

  
    res.status(200).json({
        success: true,
        message: "Doctor deleted successfully"
    });
});