const WishModel = require("../models/WishModel");

const WishListService = async (re) => {

};

const SaveWishListService = async (req) => {
try{
    let user_id=req.headers.user_id;
let reqBody=req.body
reqBody.userID=user_id
await WishModel.updateOne(reqBody,{$set:reqBody},{upsert:true})
return {status:'success',message:'wishlist save success'}
}catch(e){
    return{status:'fail',message:'something went wrong'}
}
};

const RemoveWishListService = async (req) => {
    try{
        let user_id=req.headers.user_id;
    let reqBody=req.body
    reqBody.userID=user_id
    await WishModel.updateOne(reqBody)
    return {status:'success',message:'wishlist removed success'}
    }catch(e){
        return{status:'fail',message:'something went wrong'}
    }
    
};

module.exports = {
  WishListService,
  SaveWishListService,
  RemoveWishListService,
};
