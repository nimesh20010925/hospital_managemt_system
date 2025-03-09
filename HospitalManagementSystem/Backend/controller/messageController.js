import { chatchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Message } from "../models/messageSchema.js";
import ErrorHandler from '../middlewares/errorMiddleware.js';

export const sendMessage = chatchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;

    // Additional field validation
    if (!firstName || !lastName || !email || !phone || !message) {
        return next(new ErrorHandler("Please fill out the entire form!", 400));
    }

    // Save the message to the database
    await Message.create({ firstName, lastName, email, phone, message });

    res.status(200).json({
        success: true,
        message: "Message sent successfully!"
    });
});

export const getAllMessages = chatchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        messages
    });
});
