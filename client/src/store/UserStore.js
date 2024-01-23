import create from "zustand";
import axios from "axios";
import { getEmail, setEmail } from "../utility/Utility";
const UserStore = create((set) => ({
    LoginFormData:{email:'hello'},
    LoginFormOnChange:(name,value)=>{
        set((LoginFormData)=>({
            ...LoginFormData,
            [name]:value
        }))
    },
  isFormSubmit:false,

  UserOtpRequest:async (email) => {
             set({ isFormSubmit: true })
             let res = await axios.get(`/api/v1/UserOTP/${email}`);

    setEmail(email);
    set({ isFormSubmit: false });

    return res.data["status"] === "success";
  },
  VerifyLoginRequest:async (otp) => {
    set({ isFormSubmit: true });

    let email = getEmail();

    let res = await axios.get(`/api/v1/VerifyLogin/${email}/${otp}`);
    set({ isFormSubmit: false });

    return res.data["status"] === "success";
  },
}));

export default UserStore;
