import React from "react";
import { useNavigate } from "react-router-dom";
import UserSubmitButton from "../layout/UserSubmitBtn";
import UserStore from "../../store/UserStore";
import ValidationHelper from "../../utility/ValidationHelper";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

function LoginForm() {
  const navigate = useNavigate();
  const { LoginFormData, LoginFormOnChange, UserOtpRequest } = UserStore();
  const { email } = LoginFormData;

  const onFormSubmit = async () => {
    if (!ValidationHelper.IsEmail(email)) {
      toast.error("Valid Email Address is required");
    } else {
      // Store email in cookie
      Cookies.set("email", email);

      let res = await UserOtpRequest(email);
      console.log(res);
      res ? navigate("/otp") : toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="container section">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5">
            <div className="card p-5">
              <h4>Enter Your Email</h4>
              <p>A verification code will be sent to the email address you provide</p>
              <input
                value={email}
                onChange={(e) => {
                  LoginFormOnChange("email", e.target.value);
                }}
                placeholder="Email Address"
                type="email"
                className="form-control"
              />
              <UserSubmitButton onClick={onFormSubmit} className="btn mt-3 btn-success" text="Next" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;