class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const eroorMiddleware =(err,req,res,next)=>{
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode|| 500;
    
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }
    if(err.code === "JsonWebTokenError"){
        const message = `Jeson web token is invalid,Try Again`;
        err = new ErrorHandler(message, 400);
    }
    if(err.code === "TokenExpiredError"){
        const message = `Jeson web token is Expired,Try Again`;
        err = new ErrorHandler(message, 400);
    }
    if(err.code === "CastError"){
        const message = `invalid${err.path}`;
        err = new ErrorHandler(message, 400);
    }
 const errorMessage = err.errors ? Object.values(err.errors).map(error=>error.message).join(" "): err.message



    return res.status(err.statusCode).json({
        success : false,
        message :errorMessage
    })
}

export default ErrorHandler