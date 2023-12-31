const mongoose = require("mongoose");
const CartModel = require("../models/CartModel");
const UserModel = require("../models/UserModel");
const InvoiceModel = require("../models/InvoiceModel");
const InvoiceProductModel = require("../models/InvoiceProductModel");
const PaymentSettingModel = require("../models/PamentSettingModel");
const ObjectID=mongoose.Types.ObjectId
const FormData = require('form-data');
const axios = require("axios");

const CreateInvoiceService = async (req) => {


// =============Step 01: Calculate Total Payable & Vat=====================================================================================

    let user_id = new ObjectID(req.headers.user_id);
    let cus_email=req.headers.email;

    let matchStage = {$match: { userID: user_id } };
    let JoinStageProduct = {$lookup: {from: "products", localField: "productID", foreignField: "_id", as: "product"}};
    let unwindStage = {$unwind: "$product"};


    let CartProducts = await CartModel.aggregate([matchStage, JoinStageProduct, unwindStage]);



    let totalAmount = 0;
    CartProducts.forEach(element => {
        let price;
        if (element['product']['discount']) {
            price = parseFloat(element['product']['discountPrice']);
        } else {
            price = parseFloat(element['product']['price']);
        }
        totalAmount += parseFloat(element['qty']) * price;
    });


    let vat = totalAmount * 0.05; // 5% VAT
    let payable = totalAmount + vat; // Total amount including VAT









// =============Step 02: Prepare  Customer Details & Shipping Details=====================================================================================


    // let Profile=await UserModel.aggregate([{$match: {userID:user_id}}]);
    let Profile=await UserModel.aggregate([matchStage]);
    console.log(Profile)
    // let cus_details=`Name: ${Profile[0].cus_name}, Email: ${cus_email}, Address: ${Profile[0].cus_add}, Phone: ${Profile[0].cus_phone}`
    // let ship_details=`Name: ${Profile[0].ship_name}, City: ${Profile[0].ship_city}, Address: ${Profile[0].ship_add}, Phone: ${Profile[0].ship_phone}`






 // =============Step 03: Transaction & Other's ID=====================================================================================


     let tran_id=Math.floor(100000000 + Math.random() * 900000000);
     let val_id=0;
     let delivery_status="pending";
     let payment_status="pending";





 // =============Step 04: Create Invoice=====================================================================================


     let createInvoice=await InvoiceModel.create({
       userID: user_id,
       payable: payable,
    //    cus_details:cus_details,
    //    ship_details:ship_details,
       tran_id:tran_id,
       val_id:val_id,
       delivery_status:delivery_status,
       payment_status:payment_status,
       total:totalAmount,
       vat:vat
   })





     // =============Step 05: Create Invoice Product=====================================================================================


         let Invoice_id=createInvoice['_id'];

         CartProducts.forEach(async (element)=>{
            await InvoiceProductModel.create({
                userID:user_id,
                productID:element['productID'],
                invoiceID:Invoice_id,
                qty:element['qty'],
                price: element['product']['discount']?element['product']['discountPrice']:element['product']['price'],
                color:element['color'],
                size:element['size']
            });
         });










  //=============Step 06: Remove Carts=====================================================================================

     await CartModel.deleteMany({userID:user_id});




  //=============Step 07: Prepare SSL Payment====================================================================================



    
      return {status:"success",data: matchStage}


}




const PaymentFailService = async (req)=>{
    // try{
    //     let trxID= req.params.trxID;
    //     await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"fail"})
    //     return {status:"payment fail"}
    // }catch (e) {
    //     return {status:"fail", message:"Something Went Wrong"}
    // }
}


const PaymentCancelService = async (req)=>{
    // try{
    //     let trxID= req.params.trxID;
    //     await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"cancel"})
    //     return {status:"payment fail"}
    // }catch (e) {
    //     return {status:"fail", message:"Something Went Wrong"}
    // }
}


const PaymentIPNService = async (req)=>{
    // try{
    //     let trxID= req.params.trxID;
    //     let status=req.body['status']
    //     await InvoiceModel.updateOne({tran_id:trxID},{payment_status:status})
    //     return {status:"payment fail"}
    // }catch (e) {
    //     return {status:"fail", message:"Something Went Wrong"}
    // }
}


const PaymentSuccessService = async (req)=>{
    // try{
    //     let trxID= req.params.trxID;
    //     await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"success"})
    //     return {status:"payment success"}
    // }catch (e) {
    //     return {status:"fail", message:"Something Went Wrong"}
    // }
}


const InvoiceListService = async (req)=>{
    // try{
    //     let user_id = req.headers.user_id;
    //     let invoice=await InvoiceModel.find({userID:user_id})
    //     return {status:"success",data: invoice}
    // }catch (e) {
    //     return {status:"fail", message:"Something Went Wrong"}
    // }
}

const InvoiceProductListService = async (req)=>{
    // try{
    //     let user_id = new ObjectID(req.headers.user_id);
    //     let invoice_id = new ObjectID(req.params.invoice_id)

    //     let matchStage = {$match: { userID: user_id,invoiceID:invoice_id } };
    //     let JoinStageProduct = {$lookup: {from: "products", localField: "productID", foreignField: "_id", as: "product"}};
    //     let unwindStage = {$unwind: "$product"};




    //     let invoice=await InvoiceProductModel.aggregate([
    //         matchStage,
    //         JoinStageProduct,
    //         unwindStage
    //     ])
    //     return {status:"success",data: invoice}
    // }catch (e) {
    //     return {status:"fail", message:"Something Went Wrong"}
    // }
}




module.exports={
    CreateInvoiceService,
    PaymentFailService,
    PaymentCancelService,
    PaymentIPNService,
    PaymentSuccessService,
    InvoiceListService,
    InvoiceProductListService
}