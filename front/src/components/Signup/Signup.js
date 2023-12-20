import React, { useEffect, useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiEye, HiEyeOff } from "react-icons/hi";
import {
  signupUser,
  signinUser,
  // signinGoogle,
} from "../../Reducers/auth.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [signindetail, setSigninDetail] = useState(false);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signinData, setSignData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };

  const { successsignup, successsignin ,errorsignin } = useSelector((state) => state.user);

  useEffect(() => {
    if (successsignin || successsignup) {
      navigate("/dash");
    }
    else if(!successsignin&&errorsignin)
    {
      toast.error(errorsignin);
    }
  }, [successsignin, successsignup,errorsignin]);

  const handleLogin = () => {
    setSigninDetail(!signindetail);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signupUser(formData));
  };

  const handleSubmitSignin = (e) => {
    e.preventDefault();

    dispatch(signinUser(signinData));
  };
  return (
    <div className="outer_signup">
      <div className="signup_inside">
        <div className="signup_done">
          <span>{!signindetail ? "Welcome Back :)" : "Hello !"}</span>
          <section>
            <p></p>
            <span>{!signindetail ? " Login " : "Create your Account"}</span>
            <p></p>
          </section>
          <form className="w-full">
            <div className="all_input">
              {signindetail ? (
                <>
                  <input
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                  <input
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                  <input
                    placeholder="Email-id"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <div className="input_section">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password"
                      style={{ width: "100%" }}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <div
                      className="eye-icon"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? <HiEye /> : <HiEyeOff />}
                    </div>
                  </div>
                  <div className="input_section">
                    <input
                      placeholder="Confirm Password"
                      type={passwordVisible2 ? "text" : "password"}
                      value={formData.confirmPassword}
                      style={{ width: "100%" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                    <div
                      className="eye-icon"
                      onClick={togglePasswordVisibility2}
                    >
                      {passwordVisible2 ? <HiEye /> : <HiEyeOff />}
                    </div>
                  </div>
                  <button onClick={handleSubmit}>
                    {signindetail ? "SIGN UP" : "SIGN IN"}
                  </button>
                </>
              ) : (
                <>
                  <input
                    placeholder="Email-id"
                    value={signinData.email}
                    onChange={(e) =>
                      setSignData({ ...signinData, email: e.target.value })
                    }
                  />
                  <div className="input_section">
                    {" "}
                    <input
                      style={{ width: "100%" }}
                      placeholder="Password"
                      type={passwordVisible ? "text" : "password"}
                      value={signinData.password}
                      onChange={(e) =>
                        setSignData({ ...signinData, password: e.target.value })
                      }
                    />
                    <div
                      className="eye-icon"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? <HiEye /> : <HiEyeOff />}
                    </div>
                  </div>
                  <button onClick={handleSubmitSignin}>
                    {signindetail ? "SIGN UP" : "SIGN IN"}
                  </button>
                </>
              )}
            </div>
          </form>
          <h3>
            {signindetail
              ? "Already have an Account ?"
              : "Don't have an Account ?"}
            <strong onClick={handleLogin}>
              {signindetail ? " SIGN IN" : " SIGN UP"}
            </strong>{" "}
          </h3>
        </div>
        <p></p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
