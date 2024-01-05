const {FeaturesListService}=require('../services/FeaturesServices')

exports.FeatureList=async(req,res)=>{
    const result=await FeaturesListService(req)
    return res.status(200).json(result)
}