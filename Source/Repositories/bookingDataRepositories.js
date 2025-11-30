const BookingData = require("../Schema/bookingData");
const secondButtonIDs = require("../Schema/secondButtonIdsSchema");
const ButtonIDs = require("../Schema/buttonIdsSchema copy");

async function addButtonId(buttonId){
  try {
    const doc = await ButtonIDs.findOne();

    if (!doc) {
      console.error("No document found to update.");
      return null;
    }

    doc.buttonIds.push(buttonId);
    await doc.save();

    console.log("Button ID added successfully:", buttonId);
    return doc;
  } catch (error) {
    console.error("Failed to add button ID:", error);
    throw error;
  }
};
async function addButtonId2(buttonId){
  try {
    const doc = await secondButtonIDs.findOne();

    if (!doc) {
      console.error("No document found to update.");
      return null;
    }

    doc.buttonIds.push(buttonId);
    await doc.save();

    console.log("Button ID added successfully:", buttonId);
    return doc;
  } catch (error) {
    console.error("Failed to add button ID:", error);
    throw error;
  }
};


async function getAllButtonIds(){
    try {
      const doc = await ButtonIDs.findOne();
  
      if (!doc) {
        console.error("No document found.");
        return [];
      }
  
      return doc.buttonIds || [];
    } catch (error) {
      console.error("Failed to fetch button IDs:", error);
      throw error;
    }
  };

  async function getAllButtonIds2(){
    try {
      const doc = await secondButtonIDs.findOne();
  
      if (!doc) {
        console.error("No document found.");
        return [];
      }
  
      return doc.buttonIds || [];
    } catch (error) {
      console.error("Failed to fetch button IDs:", error);
      throw error;
    }
  };

  async function createCustomer(userDetails){

    console.log(userDetails);
   
      try {
          const response = await BookingData.create(userDetails);

          if(userDetails.complexName === "alpha"){
            if(response != null){
              addButtonId(userDetails.ButtonId);
            }
          } else if(userDetails.complexName === "beta"){
            if(response != null){
              addButtonId2(userDetails.ButtonId);
            }
          }

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
  getAllButtonIds,
  getAllButtonIds2,
  createCustomer
};
