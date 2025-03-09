import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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
        minLength: [9,"Phone Number must contin Exact 9 Digits!"],
        maxLength: [12,"Phone Number must contin Exact 12 Digits!"]
        
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
    appointment_date:{
        type :String,
        required : true
    },
    department : {
        type :String,
        required : true
    },
    doctor:{
        firstName:{
            type :String,
            required : true
        },
        lastName:{
            type :String,
            required : true
        }
    },
    hasVisited : {
        type : Boolean,
        default : false,
    },
    doctorId : {
        type :mongoose.Schema.ObjectId,
        required :true
},
patientId : {
    type :mongoose.Schema.ObjectId,
    required :true
},
address:{
    type :String,
    required : true
},
status :{
    type :String,
    enum : ["Pending","Accepted","Rejected"],
    default : "Pending",  
}
})


export const Appointment = mongoose.model("Appointment" , appointmentSchema)