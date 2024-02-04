import UserStore from "../../store/UserStore.js";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import ProfileSkeleton from "../../skeleton/ProfileSkeleton.jsx";
import Cookies from "js-cookie";

const ProfileForm = () => {
  const tokenValue = Cookies.get("token");
  if (tokenValue) {
    // console.log("Token:", tokenValue);
  } else {
    console.log("Token not found in cookies.");
  }
  let {
    ProfileDetails,
    ProfileForm,
    ProfileFormChange,
    ProfileDetailsRequest,
    ProfileSaveRequest,
    UserEmailRequest,
    userEmailDetail
  } = UserStore();

  const email=Cookies.get('email')
  // console.log(email)
  useEffect(() => {
    (async () => {
      await ProfileDetailsRequest();
      await ProfileSaveRequest()
      await UserEmailRequest(email);
    })();
  }, []);
  console.log(userEmailDetail)

  const Save = async () => {
    let res = await ProfileSaveRequest(userEmailDetail);
    console.log(res);
    if (res) {
      toast.success("Profile Updated");
      await ProfileDetailsRequest();
    }
  };

  if (userEmailDetail === null) {
    return <ProfileSkeleton />;
  } else {
    return (
      <div className="container mt-5">
        <div className="card p-5 rounded-3">
          <h6>Customer Details</h6>
          <hr />
          <div className="row mb-4">
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Name </label>
              <input
                value={userEmailDetail.cus_name}
                onChange={(e) => {
                  ProfileFormChange("cus_name", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Phone </label>
              <input
                value={userEmailDetail.cus_phone}
                onChange={(e) => {
                  ProfileFormChange("cus_phone", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>

            <div className="col-md-3 p-2">
              <label className="form-label">Customer Fax </label>
              <input
                value={userEmailDetail.cus_fax}
                onChange={(e) => {
                  ProfileFormChange("cus_fax", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Country </label>
              <input
                value={userEmailDetail.cus_country}
                onChange={(e) => {
                  ProfileFormChange("cus_country", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer City </label>
              <input
                value={userEmailDetail.cus_city}
                onChange={(e) => {
                  ProfileFormChange("cus_city", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer State </label>
              <input
                value={userEmailDetail.cus_state}
                onChange={(e) => {
                  ProfileFormChange("cus_state", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Post Code </label>
              <input
                value={userEmailDetail.cus_postcode}
                onChange={(e) => {
                  ProfileFormChange("cus_postcode", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Address</label>
              <input
                value={userEmailDetail.cus_add}
                onChange={(e) => {
                  ProfileFormChange("cus_add", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
          </div>

          <h6>Shipping Details</h6>
          <hr />
          <div className="row">
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping Name </label>
              <input
                value={userEmailDetail.ship_name}
                onChange={(e) => {
                  ProfileFormChange("ship_name", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping Phone </label>
              <input
                value={userEmailDetail.ship_phone}
                onChange={(e) => {
                  ProfileFormChange("ship_phone", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping Country </label>
              <input
                value={userEmailDetail.ship_country}
                onChange={(e) => {
                  ProfileFormChange("ship_country", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping City </label>
              <input
                value={userEmailDetail.ship_city}
                onChange={(e) => {
                  ProfileFormChange("ship_city", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping State </label>
              <input
                value={userEmailDetail.ship_state}
                onChange={(e) => {
                  ProfileFormChange("ship_state", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping Post Code </label>
              <input
                value={userEmailDetail.ship_postcode}
                onChange={(e) => {
                  ProfileFormChange("ship_postcode", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping Address</label>
              <input
                value={userEmailDetail.ship_add}
                onChange={(e) => {
                  ProfileFormChange("ship_add", e.target.value);
                }}
                type="text"
                className="form-control "
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-3 p-2">
              <button onClick={Save} className="btn btn-success">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileForm;
