import create from 'zustand';
import axios  from "axios";
import { unauthorized } from '../utility/Utility';

const WishStore=create((set)=>({
    isWishSubmit:false,
    WishSaveRequest:async(productID)=>{
        console.log(WishSaveRequest)
        try {
            set({isWishSubmit:true})
            let res=await axios.post(`http://localhost:5000/api/v1/SaveWishList`,{productID:productID});
            console.log(res)
            return res.data['status'] === "success";
        }catch (e) {
            console.log(e)
            unauthorized(e.response.status)
        }finally {
            set({isWishSubmit:false})
        }
    },


    WishList:null,
    WishCount:0,
    WishListRequest:async()=>{
        try {
            let res=await axios.get(`/api/v1/WishList`);
            set({WishList:res.data['data']})
            set({WishCount:(res.data['data']).length})
        }catch (e) {
            unauthorized(e.response.status)
        }
    },

}))

export default WishStore;
