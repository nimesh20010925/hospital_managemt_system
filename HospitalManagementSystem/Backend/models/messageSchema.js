import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        minLength: [3, "First Name must contain at least 3 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
        minLength: [3, "Last Name must contain at least 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone: {
        type: String,
        required: [true, "Phone Number is required"],
        minLength: [10, "Phone Number must contain exactly 10 digits"],
        maxLength: [10, "Phone Number must contain exactly 10 digits"],
        validate: {
            validator: function (v) {
                return /^[0-9]+$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        minLength: [10, "Message must contain at least 10 characters"]
    }
});

export const Message = mongoose.model("Message", messageSchema);
