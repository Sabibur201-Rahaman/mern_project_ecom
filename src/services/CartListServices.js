const CartModel = require("../models/CartModel");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const CartListService = async (req) => {
  try {
    let user_id = new ObjectID(req.headers.user_id);
    // console.log(user_id)
    let matchStage = { $match: { userID: user_id } };
    let JoinStageProduct = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    let unwindProductStage = { $unwind: "$product" };

    let JoinStageBrand = {
      $lookup: {
        from: "brands",
        localField: "product.brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };

    let JoinStageCategory = {
      $lookup: {
        from: "categories",
        localField: "product.categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };

    let projectionStage = {
      $project: {
        _id: 0,
        userID: 0,
        createAt: 0,
        updatedAt: 0,
        "product._id": 0,
        "product.categoryID": 0,
        "product.brandID": 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };

    let data = await CartModel.find(
      // matchStage,
      // JoinStageProduct,
      // unwindProductStage,
      // JoinStageBrand,
      // unwindBrandStage,
      // JoinStageCategory,
      // unwindCategoryStage,
      // projectionStage,
    );
    console.log(data)
    return { status: "success", data: data };
  } catch (e){
    console.log(e)
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

const SaveCartListService = async (req) => {
  try {
    // Validate that user_id exists in headers
    let user_id = req.params.userID;
    if (!user_id) {
      throw new Error("User ID not provided in headers");
    }

    let reqBody = req.body;
    reqBody.userID = user_id;

    // Assuming CartModel has a defined schema
    await CartModel.create(reqBody);

    return { status: "success", message: "CartList save success" };
  } catch (e) {
    // Log the error for debugging purposes
    console.error("Error in SaveCartListService:", e);

    return { status: "fail", message: "Something went wrong" };
  }
};


const UpdateCartListService = async (req) => {
  console.log(req)
  try {
    let user_id = req.headers.user_id;
    let cartId = req.params.cartId;
    let reqBody = req.body;
    reqBody = req.body;
    const result=await CartModel.updateOne(
      
      { _id: cartId },
      { $set: reqBody }
    );
    console.log(result)
    return { status: "success", message: "CartList update success" };
  } catch (e) {
    return { status: "fail", message: "something went wrong" };
  }
};

const RemoveCartListService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let cartID = req.params.cartId

    let reqBody = req.body;
    reqBody.userID = user_id;
    await CartModel.deleteOne({_id:cartID});
    return { status: "success", message: "CartList removed success" };
  } catch (e) {
    return { status: "fail", message: "something went wrong" };
  }
};

module.exports = {
  CartListService,
  SaveCartListService,
  RemoveCartListService,
  UpdateCartListService,
};
