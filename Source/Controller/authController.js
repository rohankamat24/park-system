const {validateLogin} = require('../Services/authService');
require("dotenv").config();
const jwt = require("jsonwebtoken");

async function login(req, res){

    
    try {
        const loginPayload = req.body;

        const response = await validateLogin(loginPayload);

        res.cookie("authToken", response.token, {
            httpOnly : true,
            sameSite: "lax", 
            secure: true,
            // domain: "http://127.0.0.1:5500",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        
        return res.status(200).json({
            success: true,
            message: "logged in successfully",
            data: {
                userRole: response.userRole,
                userData: response.userData
            },
            error: {}
        })
    } catch (error) {
        let errorMessage = error.message;
        if (error.errors) {
            if (error.errors.email.message && error.errors.email.message) {
                errorMessage = error.errors.email.message;
            } else if (error.errors.mobileNumber.message && error.errors.mobileNumber.message) {
                errorMessage = error.errors.mobileNumber.message;
            }
        }
        return res.status(error.statusCode || 500).json({
            success: false,
            data: {},
            error: errorMessage,
            statusCode: error.statusCode
        })
    }
}

async function logout(req, res){

    res.cookie("authToken", "", {
        httpOnly : true,
        secure: true,
    });

    return res.status(200).json({
        success: true,
        message: "logged out successfully",
        error: {},
        data: {}
        
    })
}

async function checkAuth(req, res){
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(200).json({ authenticated: false });
    }

    try {
        // ✅ Replace "your_jwt_secret" with your actual secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({
            authenticated: true,
            user: decoded // optionally return user info
        });
    } catch (err) {
        return res.status(200).json({ authenticated: false });
    }
}

module.exports = {
    login,
    logout,
    checkAuth
}