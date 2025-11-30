
const { createCustomer } = require('../Repositories/bookingDataRepositories');


    
async function registerCustomer(userDetails){
  
  

    // if not then create a new user in the database;
    const newCustomer = await createCustomer({
        Name: userDetails.Name,
        Email  : userDetails.Email,
        vehicleType: userDetails.vehicleType,
        ButtonId: userDetails.ButtonId,
        PaymentId: userDetails.PaymentId,
        Booking_Date: userDetails.Booking_Date,
        Price : userDetails.Price,
        complexName : userDetails.complexName
    })


    if(!newCustomer){
        throw { message : "Something went wrong while booking", statusCode: 500}
    }


    //return the details of new user
    return newCustomer;


}

module.exports = {
    registerCustomer,
    
}