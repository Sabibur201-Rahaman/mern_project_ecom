const express=require('express');
const ProductController=require('../controllers/ProductController')
const UserController=require('../controllers/UserController')
const AuthVerification=require('../middlewares/AuthVerification')
const WishListController=require("../controllers/WishListController")
const CartListController=require("../controllers/CartListController")
const InvoiceController=require("../controllers/InvoiceController")
const FeaturesController=require("../controllers/FeaturesController")

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
router.delete('/RemoveCartList/:cartId',AuthVerification,CartListController.RemoveCartList)
router.patch('/UpdateCartList/:cartId',AuthVerification,CartListController.UpdateCartList)

// Invoice & Payment
router.get('/CreateInvoice',AuthVerification,InvoiceController.CreateInvoice)

router.get('/InvoiceList',AuthVerification,InvoiceController.InvoiceList)
router.get('/InvoiceProductList/:invoice_id',AuthVerification,InvoiceController.InvoiceProductList)





router.post('/PaymentSuccess/:trxID',InvoiceController.PaymentSuccess)
router.post('/PaymentCancel/:trxID',InvoiceController.PaymentCancel)
router.post('/PaymentFail/:trxID',InvoiceController.PaymentFail)
router.post('/PaymentIPN/:trxID',InvoiceController.PaymentIPN)

//Features
router.get('/FeatureList',FeaturesController.FeatureList)

//Review

router.post('/CreateReview',AuthVerification,ProductController.CreateReview)


module.exports=router;