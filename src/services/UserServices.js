const EmailSend = require("../utility/EmailHelper");
const UserModel=require("../models/UserModel")
const ProfileModel=require("../models/ProfileModel")

const {EncodeToken} = require("../utility/TokenHelper");

const UserOTPService = async (req) => {
     try {
         let email=req.params.email;
         let code=Math.floor(100000+Math.random()*900000);

         let EmailText=`Your Verification Code is= ${code}`
         let EmailSubject='Email Verification'

         await EmailSend(email,EmailText,EmailSubject);

         await UserModel.updateOne({email:email},{$set:{otp:code}},{upsert:true})

         return {status:"success", message:"6 Digit OTP has been send"}
     }catch (e) {
         return {status:"fail", message:"there is Something Went Wrong"}
     }
}

const VerifyOTPService = async (req) => {

    try {
        let email=req.params.email;
        let otp=req.params.otp;

        // User Count
        let total=await UserModel.find({email:email,otp:otp}).count('total');
        if(total===1){

            // User ID Read
            let user_id=await UserModel.find({email:email,otp:otp}).select('_id');
                console.log(user_id)
            // User Token Create
            let token=EncodeToken(email,user_id[0]['_id'].toString())  //  query
            console.log("token",token)

            // OTP Code Update To 0
            await UserModel.updateOne({email:email},{$set:{otp:"0"}})

            return {status:"success", message:"Valid OTP",token:token}

        }
        else{
            return {status:"fail", message:"invalid OTP"}
        }

    }catch (e) {
        return {status:"fail", message:"Invalid OTP"}
    }


}

const SaveProfileService = async (req) => {
   try {
    // let user_id=req.headers.user_id;
    // let reqBody=req.body
    // reqBody.userID=user_id
    const user = await UserModel.create(req.body);
    console.log(user)
    return { status: "success", message: "Profile Save Success" }
   }catch (e) {
       return {status:"fail", message:" there is Something Went Wrong"}
   }
}
const UpdateProfileService = async (req) => {
    try {
        // Assuming req.body contains the filter criteria and the update fields
        const user = await UserModel.findById(req.params.id);

        if (!user) {
            return { status: "fail", message: "No matching user found" };
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body, // Use the entire request body for the update
            { new: true }
        );

        if (updatedUser) {
            return { status: "success", message: "Profile Save Success", user: updatedUser };
        } else {
            return { status: "fail", message: "No changes applied" };
        }
    } catch (e) {
        console.error(e);
        return { status: "fail", message: "Something went wrong" };
    }
};

const ReadProfileService = async (req) => {
    try {
        const result = await UserModel.findById(req.params.id);
        if (!result) {
            return { status: "fail", message: "No matching user found" };
        }
        const updatedResult=await UserModel.findOne({_id:req.params.id})
        // let result= await UserModel.find({userID:id})
        return {status:"success", data:updatedResult}
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}


module.exports={
    UserOTPService,
    VerifyOTPService,
    SaveProfileService,
    ReadProfileService,
    UpdateProfileService
}

