const {registerUser} = require('../Services/userService');


async function createUser(req, res){

    try {
        const response = await registerUser(req.body);
        return res.status(201).json({
            message: "User Registered successfully",
            success: true,
            data: response,
            error: {}
        })
        
    } catch (error) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Something went wrong";
        const errorData = error.data || {};

        return res.status(statusCode).json({
            success: false,
            message,
            data: {},
            error: errorData
        });
    }
}

module.exports = {
    createUser
}