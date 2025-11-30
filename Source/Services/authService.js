const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authFindUser } = require("../Repositories/authRepositories");
const { JWT_SECRET, JWT_EXPIRY } = require('../config/serverConfig');

async function validateLogin(authDetails){

    const email =authDetails.email;
    const mobileNumber = authDetails.mobileNumber;
    const plainPassword = authDetails.password;

     // Check if the user exist or not

      const user = await authFindUser({
            $or: [{ email }, { mobileNumber }]
      }); 
    
     if(!user){
        throw {message: "No user Found Please Register first", statusCode: 404}
     }

     //If user found we need to compare plain password to hashed password
     const isPasswordValidated = await bcrypt.compare(plainPassword, user.password);

     if(!isPasswordValidated){
        throw { message: "Incorrect Password, Please Try again!!", statusCode: 401}
     }


     // If the password is validated create a token and return it
     const token = jwt.sign({email: user.email, id: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRY});

     return {token, userData:{
      email: user.email,
      firstName: user.firstName
     }};
} 


module.exports = {
   validateLogin
}