const { getAllButtonIds, getAllButtonIds2 } = require("../Repositories/bookingDataRepositories");
const { registerCustomer } = require("../Services/bookingDataService");


async function createCustomer(req, res){

    try {
        const response = await registerCustomer(req.body);
        return res.status(201).json({
            message: "Ticket Created successfully",
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

async function getButtonIds(req, res){
    try {
      const buttonIds = await getAllButtonIds();
  
      res.status(200).json({
        success: true,
        message: "Button IDs fetched successfully",
        data: buttonIds
      });
  
    } catch (error) {
      console.error("Error in getButtonIdsController:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch button IDs",
        error: error.message
      });
    }
  };

  async function getButtonIds2(req, res){
    try {
      const buttonIds = await getAllButtonIds2();
  
      res.status(200).json({
        success: true,
        message: "Button IDs fetched successfully",
        data: buttonIds
      });
  
    } catch (error) {
      console.error("Error in getButtonIdsController:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch button IDs",
        error: error.message
      });
    }
  };
  

module.exports = {
    createCustomer,
    getButtonIds,
    getButtonIds2
}