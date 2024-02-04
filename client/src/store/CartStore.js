import create from "zustand";
import axios from "axios";
import { GetUserID, getToken, unauthorized } from "../utility/Utility";
import Cookies from "js-cookie";

const CartStore = create((set) => ({
  isCartSubmit: false,
  CartForm: { productID: "", color: "", size: "" },
  CartFormChange: (name, value) => {
    set((state) => ({
      CartForm: {
        ...state.CartForm,
        [name]: value,
      },
    }));
  },
  

  CartSaveRequest: async (PostBody, productID, quantity) => {
    try {
      let token=getToken()
     let myId=GetUserID()
     console.log(myId)
      const headers={
        token:token,
        userId:GetUserID()
      }
      // console.log(headers.userId)
      set({ isCartSubmit: true });
      PostBody.productID = productID;
      PostBody.qty = quantity;
      let res = await axios.post(`http://localhost:5000/api/v1/CreateCartList/${headers.userId}`,PostBody,token);
      console.log(res)
      return res.data["status"] === "success";
    } catch (e) {
      console.log(e)
      // unauthorized(e.response.status);
    } finally {
      set({ isCartSubmit: false });
    }
  },

  CartList: null,
  CartCount: 0,
  CartListRequest: async () => {
    try {
      let res = await axios.get(`http://localhost:5000/api/v1/CartList`);
      console.log(res.data.data)
      set({ CartList: res.data["data"] });
      set({ CartCount: res.data["data"].length });
    } catch (e) {
      unauthorized(e.response.status);
    } finally {
      set({ isCartSubmit: false });
    }
  },

  // CreateInvoiceRequest: async () => {
  //   try {
  //     set({ isCartSubmit: true });
  //     let res = await axios.get(`/api/v1/CreateInvoice`);
  //     window.location.href = res.data["data"]["GatewayPageURL"];
  //   } catch (e) {
  //     unauthorized(e.response.status);
  //   } finally {
  //     set({ isCartSubmit: false });
  //   }
  // },
  // InvoiceList: null,
  // InvoiceListRequest: async () => {
  //   try {
  //     let res = await axios.get(`/api/v1/InvoiceList`);
  //     set({ InvoiceList: res.data["data"] });
  //   } catch (e) {
  //     unauthorized(e.response.status);
  //   } finally {
  //   }
  // },
}));

export default CartStore;
