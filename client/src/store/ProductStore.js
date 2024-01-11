import create from "zustand"
import axios from "axios"
const ProductStore=create((set)=>({
    
    BrandList:null,
    BrandListRequest:async()=>{
        let res=await axios.get("/api/v1/ProductBrandList")
        if(res.data['status']==='success'){
            set({BrandList:res.data['data']})
        }
    },

    CategoryList:null,

    CategoryListRequest:async()=>{
        let res=await axios.get("/api/v1/ProductCategoryList")
        if(res.data['status']==='success'){
            set({CategoryList:res.data['data']})
        }
    }  , 
    
    SliderList:null,

    SliderListRequest:async()=>{
        let res=await axios.get("/api/v1/ProductSliderList")
        if(res.data['status']==='success'){
            set({SliderList:res.data['data']})
        }
    } ,
    ListByBrand:null,

    ListByBrandRequest:async(BrandID)=>{
        let res=await axios.get(`/api/v1/ProductListByBrand/${BrandID}`)
        if(res.data['status']==='success'){
            set({ListByBrand:res.data['data']})
        }
    },
    ListByCategory:null,
    ListByCategoryRequest:async(CategoryID)=>{
        let res=await axios.get(`/api/v1/ProductListByCategory/${CategoryID}`)
        if(res.data['status']==='success'){
            set({ListByCategory:res.data['data']})
        }
    },
    ListByKeyword:null,

    ListByKeywordRequest:async(Keyword)=>{
        let res=await axios.get(`/api/v1/ProductListByCategory/${Keyword}`)
        if(res.data['status']==='success'){
            set({ListByKeyword:res.data['data']})
        }
    },
    ListBySimiliar:null,

    ListBySimiliarRequest:async(CategoryID)=>{
        let res=await axios.get(`/api/v1/ProductListBySmilier/${CategoryID}`)
        if(res.data['status']==='success'){
            set({ListBySimiliar:res.data['data']})
        }
    },
    ListByRemark:null,

    ListByRemarkRequest:async(Remark)=>{
        let res=await axios.get(`/api/v1/ProductListByRemark/${Remark}`)
        if(res.data['status']==='success'){
            set({ListByRemark:res.data['data']})
        }
    },
    ReviewList:null,

    ReviewListRequest:async(ProductID)=>{
        let res=await axios.get(`/api/v1/ProductReviewList/${ProductID}`)
        if(res.data['status']==='success'){
            set({ReviewList:res.data['data']})
        }
    },
    DetailList:null,

    DetailListRequest:async(ProductID)=>{
        let res=await axios.get(`/api/v1/ProductDetails/${ProductID}`)
        if(res.data['status']==='success'){
            set({DetailList:res.data['data']})
        }
    }
}))

export default ProductStore