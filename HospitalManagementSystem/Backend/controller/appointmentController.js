import { chatchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = chatchAsyncErrors(async(req,res,next)=>{
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lasttName,
        hasVisited,
        address
    }=req.body;
    if(!firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department ||
        !doctor_firstName ||
        !doctor_lasttName ||
        !address){
            return next(new ErrorHandler("please fill full form",400))
    }
    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName : doctor_lasttName,
        role : "Doctor",
        doctorDepartment : department
    })
   if(isConflict.length === 0){
    return next(new ErrorHandler("Doctor not found!",400))
   }
   if(isConflict.length > 1){
    return next(new ErrorHandler("Doctor conflict! Please contact Through Email or Phone",404))
   }
   const doctorId  = isConflict[0]._id;
   const patientId = req.user._id;
   const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor : {
        firstName : doctor_firstName,
        lastName : doctor_lasttName,
    },
    hasVisited,
    address,
    doctorId,
    patientId
   })
   res.status(200).json({
    success  : true,
    message : "Appointment sent successflly!",
    appointment
   })
}
)

export const getAllAppointment = chatchAsyncErrors(async(req,res,next)=>{
    const appointment = await Appointment.find()
    res.status(200).json({
        success : true,
        appointment
    })
})

export const updateAppointmentStatus = chatchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found ",404))
    }
    appointment = await Appointment.findByIdAndUpdate(id,req.body,{new:true,runValidators:true,useFindAndModify:false})
    res.status(200).json({
        success :true,
        message : "Appointment status updated",
        appointment
    })
})

export const deleteAppointment = chatchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found ",404))
    }
    await appointment.deleteOne();
    res.status(200).json({
        success :true,
        message : "Appointment deleted",
    })
})