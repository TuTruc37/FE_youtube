import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import {
  loginAPI,
  loginAsyncKeyAPI,
  loginFacebookAPI,
} from "../utils/fetchFromAPI";
import { toast } from "react-toastify";
import ReactFacebookLogin from "react-facebook-login";
const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {}, []);
// login đang bị vấn đề 
  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        <form className="row g-3 text-white">
          {/* email */}
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>

          {/* password */}
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Password
            </label>
            <input className="form-control" id="pass" />
          </div>
          {/* code */}
          <div className="col-md-3">
            <label htmlFor="inputEmail4" className="form-label">
              Code
            </label>
            <input className="form-control" id="code" />
          </div>
          {/* button */}
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                let email = document.getElementById("email").value;
                let pass_word = document.getElementById("pass").value;
                let code = document.getElementById("code").value;
                console.log(`email: ${email}, password: ${pass_word}`);
                loginAsyncKeyAPI({ email, pass_word, code })
                  .then((result) => {
                    console.log("get result API login: ", result);

                    // result gồm mesage và data (access token)
                    // tạo pop up thông báo login thành công
                    toast.success(result.message);

                    // lưu access token trong local storage của brower
                    localStorage.setItem("LOGIN_USER", result.data);
                    // chuyển hướng sang trang chủ sau khi login thành công
                    navigate("/");
                  })
                  .catch((error) => {
                    console.log("Error from API login", error);
                    toast.error(error.response.data.message);
                  });
              }}
            >
              Login
            </button>
            <Link to={"/forgot-pass"} className="text-primary">
              Forgot password
            </Link>
            <ReactFacebookLogin
              appId="1660220101197291"
              fields="name,email,picture"
              callback={(response) => {
                console.log(response);
                // đăng nhập với Facebook
                let { id, email, name } = response;
                loginFacebookAPI({ id, email, name })
                  .then((result) => {
                    toast.success(result.message);
                    localStorage.setItem("LOGIN_USER", result.data);
                    navigate("/");
                  })
                  .catch((error) => {
                    toast.error(error.response.data.message);
                  });
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
