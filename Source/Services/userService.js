
const {findUser, createUser} = require('../Repositories/userRepositories')


    
async function registerUser(userDetails){
    // it will create a brand new user in database;
    //we need to check if the user with this email and mobile number already exists or not
    const user = await findUser({
        $or: [
        {email: userDetails.email},
        {mobileNumber: userDetails.mobileNumber}
        ]
    })
    
    //if user not found 
    if(user){
        throw { message: "User already exist", statusCode: 409}
    }

    // if not then create a new user in the database;
    const newUser = await createUser({

        firstName : userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber,
        password: userDetails.password,
    })


    if(!newUser){
        throw { message : "Something went wrong, Unable to create user", statusCode: 500}
    }


    //return the details of new user
    return newUser;


}

module.exports = {
    registerUser
}