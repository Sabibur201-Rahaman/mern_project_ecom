const express=require('express');
const ProductController=require('../controllers/ProductController')
const UserController=require('../controllers/UserController')
const AuthVerification=require('../middlewares/AuthVerification')
const WishListController=require("../controllers/WishListController")
const CartListController=require("../controllers/CartListController")


const router=express.Router();



// Product
router.get('/ProductBrandList',ProductController.ProductBrandList)
router.get('/ProductCategoryList',ProductController.ProductCategoryList)
router.get('/ProductSliderList',ProductController.ProductSliderList)
router.get('/ProductListByBrand/:BrandID',ProductController.ProductListByBrand)
router.get('/ProductListByCategory/:CategoryID',ProductController.ProductListByCategory)
router.get('/ProductListBySmilier/:CategoryID',ProductController.ProductListBySmilier)
router.get('/ProductListByKeyword/:Keyword',ProductController.ProductListByKeyword)
router.get('/ProductListByRemark/:Remark',ProductController.ProductListByRemark)
router.get('/ProductDetails/:ProductID',ProductController.ProductDetails)
router.get('/ProductReviewList/:ProductID',ProductController.ProductReviewList)



//user

router.get('/UserOTP/:email',UserController.UserOTP)
router.get('/VerifyLogin/:email/:otp',UserController.VerifyLogin)
router.get('/UserLogout',UserController.UserLogout)
router.post('/CreateProfile',AuthVerification,UserController.CreateProfile)
router.patch('/UpdateProfile/:id',AuthVerification,UserController.UpdateProfile)
router.get('/ReadProfile/:id',AuthVerification,UserController.ReadProfile)

//wish
router.post('/SaveWishList',AuthVerification,WishListController.SaveWishList)
router.delete('/RemoveWishList',AuthVerification,WishListController.RemoveWishList)
router.get('/WishList',AuthVerification,WishListController.WishList)

//Cart
router.post('/CreateCartList/:userID',CartListController.CreateCartList)
router.get('/CartList',CartListController.CartList)
router.delete('/RemoveCartList/:_id',AuthVerification,CartListController.RemoveCartList)
router.patch('/UpdateCartList/:cartId',AuthVerification,CartListController.UpdateCartList)

module.exports=router;