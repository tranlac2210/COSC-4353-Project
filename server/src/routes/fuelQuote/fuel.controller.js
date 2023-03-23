import express from "express";
//import users from "../data/users.js"

const Quotes = class{
    constructor (gallonsRequested, selectedAddress, selectedDate, suggestedPrice, totalAmountDue){
        this.gallonsRequested = gallonsRequested;
        this.selectedAddress = selectedAddress;
        this.selectedDate = selectedDate;
        this.suggestedPrice = suggestedPrice;
        this.totalAmountDue = totalAmountDue;
    }

    calculation1(){
        suggestedPrice = 101;
        return {
            suggestedPrice
        }
    }
    calculation2(){
        totalAmountDue = 404;
        return {
            totalAmountDue
        }
    }

    

}

export const getFuelInfo = async (req, res) => {
    
    const data = req.body;
  
    var gallonsRequested = data.gallonsRequested;
    var selectedAddress = data.selectedAddress;
    var selectedDate = data.selectedDate;
    var suggestedPrice = data.suggestedPrice;
    var totalAmountDue = data.totalAmountDue;
  
    if (
      !gallonsRequested 
    ) {
      return res.status(400).json({
        error: "Gallons Requested is Invalid!",
      });
    }

    if (
        !selectedAddress 
      ) {
        return res.status(400).json({
          error: "Selected Address is Invalid!",
        });
      }

    if (
        !selectedDate 
      ) {
        return res.status(400).json({
          error: "Selected Date is Invalid!",
        });
      }

      //data.suggestedPrice = data.calculation1();
      //data.totalAmountDue = data.calculation2();
  
    //return res.status(200).json({});
  };

