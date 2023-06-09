import "./Box.scss";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Box: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let username_temp = "";
  let password_temp = "";

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("https://api-saomy.wisere.com/api/v1/auth/login", {
        email: username,
        password: password,
      })
      .then((response) => {
        localStorage.clear();
        localStorage.accessToken = response.data.accessToken;
        navigate("/dashboard");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }, [username]);


  return (
    <div className="Box">
      <div className="Box__Login">
        <div className="Box__Login__ImgContainer">
          <img
            src="https://admin-saomy.wisere.com/static/media/logo.c5b69b7c756c6e34ec98.png"
            className="Box__Login__ImgContainer__Image"
            alt="Logo"
          />
        </div>
        <h1 className="Box__Login__Title">Đăng Nhập</h1>
        <input
          type="text"
          placeholder="Đăng nhập bằng email/account đã cấp"
          className="Box__Login__Info"
          onChange={(e) => (username_temp = e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="Box__Login__Info"
          onChange={(e) => (password_temp = e.target.value)}
        />

        <div className="Box__Login__Lower">
          <div style={{ display: "flex", alignItems: "center" }}>
            <input type="checkbox" className="Box__Login__Lower__Checkbox" />
            <p>Nhớ mật khẩu</p>
          </div>
          <p className="Box__Login__Lower__Forgot">Quên mật khẩu</p>
        </div>
        <div className="hi">
          <button
            className="Box__Login__Log"
            onClick={() => {
              setUsername(username_temp);
              setPassword(password_temp);
              

            }}
          >
            Đăng Nhập
          </button>
          <div className="Box__Login__Footer">
            <p>Điều khoản sử dụng và bảo mật</p>
            <p>
              Phiên bản 1.2.21 · Bản quyền thuộc về{" "}
              <span className="Box__Login_Footer__">Sao Mỹ Dental Clinic</span>
            </p>
          </div>
        </div>
      </div>
      <div className="Box__Image" />
      <img
        className="Box__Image__Img"
        src="https://admin-saomy.wisere.com/static/media/bg-login.92e17d168e3156c4006f.png"
        alt="Background"
      />
    </div>
  );
};

export default Box;
