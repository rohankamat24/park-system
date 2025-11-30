const user = require('../Schema/userSchema');

async function findUser(parameters){
    try {
        const response = user.findOne({...parameters});
        return response;
    } catch (error) {
        console.log(err.message);
    }
   
}

async function createUser(userDetails){
    try {
        const response = await user.create(userDetails);
        return response;
    } catch (error) {
        let customError = {
            statusCode: 500,
            message: 'Internal server error',
            data: null
        };

        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            customError = {
                statusCode: 422,
                message: 'Validation failed',
                data: validationErrors
            };
        } else if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => err.message);
            customError = {
                statusCode: 422,
                message: 'Validation failed',
                data: validationErrors
            };
        } else {
            console.error("Unexpected error while creating user:", error);
        }

        throw customError;
    }
  
}

module.exports = {
    findUser,
    createUser
}