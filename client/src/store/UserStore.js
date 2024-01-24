import create from "zustand";
import axios from "axios";
import { getEmail, setEmail } from "../utility/Utility";
import Cookies from "js-cookie";
const UserStore = create((set) => ({
  isLogin: () => {
    return !!Cookies.get("token");
  },

  LoginFormData: { email: "" },
  LoginFormOnChange: (name, value) => {
    set((state) => ({
      LoginFormData: {
        ...state.LoginFormData,
        [name]: value,
      },
    }));
  },

  OTPFormData: { otp: "" },
  OTPFormOnChange: (name, value) => {
    set((state) => ({
      OTPFormData: {
        ...state.OTPFormData,
        [name]: value,
      },
    }));
  },
  isFormSubmit: false,

  UserOtpRequest: async (email) => {
    set({ isFormSubmit: true });
    let res = await axios.get(`/api/v1/UserOTP/${email}`);

    setEmail(email);
    set({ isFormSubmit: false });

    return res.data["status"] === "success";
  },
  UserLogoutRequest: async () => {
    set({ isFormSubmit: true });
    let res = await axios.get(`/api/v1/UserLogout`);

    set({ isFormSubmit: false });

    return res.data["status"] === "success";
  },
  VerifyLoginRequest: async (otp) => {
    set({ isFormSubmit: true });

    let email = getEmail();

    let res = await axios.get(`/api/v1/VerifyLogin/${email}/${otp}`);
    set({ isFormSubmit: false });

    return res.data["status"] === "success";
  },
}));

export default UserStore;
