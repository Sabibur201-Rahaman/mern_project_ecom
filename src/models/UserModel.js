const mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
        cus_name:{type:String,required:true},
email:{type:String,unique:true,required:true,lowercase:true},
        otp:{type:String,},
        cus_add:{type:String},
        cus_city:{type:String},
        cus_phone:{type:String},
        cus_country:{type:String},
        cus_fax:{type:String},
        cus_postcode:{type:String},
        cus_state:{type:String},
        ship_add:{type:String},
        ship_city:{type:String},
        ship_country:{type:String},
        ship_name:{type:String},
        ship_phone:{type:String},
        ship_postcode:{type:String},
        ship_state:{type:String},
    },
    {timestamps:true,versionKey:false}
)
const UserModel=mongoose.model('users',DataSchema)
module.exports=UserModel