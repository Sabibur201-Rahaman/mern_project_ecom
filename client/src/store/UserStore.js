import create from "zustand";
import axios from "axios";
import { GetUserID, SetUserID, getEmail, getToken, setEmail, unauthorized } from "../utility/Utility";
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
    console.log(res)
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
    SetUserID(res.data.id._id)
    
    set({ isFormSubmit: false });

    return res.data["status"] === "success";
  },
  ProfileForm: {
    cus_add: "",
    cus_city: "",
    cus_country: "",
    cus_fax: "",
    cus_name: "",
    cus_phone: "",
    cus_postcode: "",
    cus_state: "",
    ship_add: "",
    ship_city: "",
    ship_country: "",
    ship_name: "",
    ship_phone: "",
    ship_postcode: "",
    ship_state: "",
  },
  ProfileFormChange: (name, value) => {
    set((state) => ({
      ProfileForm: {
        ...state.ProfileForm,
        [name]: value,
      },
    }));
  },

  ProfileDetails: null,
  ProfileDetailsRequest: async () => {
    try {
    //   const headers = {
    //     'token': token,
    //     'user_id': GetUserID(),
    //     'Content-Type': 'application/json',
    // };
      let res = await axios.get("/api/v1/ReadProfile");
      // console.log(res)
      if (res.data["data"].length > 0) {
        set({ ProfileDetails: res.data["data"][0] });
        set({ ProfileForm: res.data["data"][0] });
      } else {
        set({ ProfileDetails: [] });
      }
    } catch (e) {
      // unauthorized(e.response.status);
    }
  },
userEmailDetail:null,
  UserEmailRequest: async (email) => {
    try {
      let res = await axios.get(`http://localhost:5000/api/v1/UserEmail/${email}`);
      console.log(res)
      if (res.data.status==='success') {
        set({ userEmailDetail: res.data.data });
      } else {
        set({ ProfileDetails: [] });
      }
    } catch (e) {
      // unauthorized(e.response.status);
    }
  },

//   ProfileSaveRequest: async (PostBody,email) => {
//     try {
//       set({ userEmailDetail: null });
//       let res = await axios.patch(`/api/v1/UpdateProfile`,PostBody,{email});
//       console.log(res.data.data)
//       return res.data["status"] === "success";
//     } catch (e) {
//       // unauthorized(e.response.status);
//     }
//   },

ProfileSaveRequest: async (PostBody, email) => {
  try {
      set({ userEmailDetail: null });

      let res = await axios.patch(`/api/v1/UpdateProfile`, { ...PostBody, email });
      console.log(res.data.data);
      return res.data["status"] === "success";
  } catch (e) {
      // Handle errors here, for example:
      // unauthorized(e.response.status);
  }
}

}));

export default UserStore;
