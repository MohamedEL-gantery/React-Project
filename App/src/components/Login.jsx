/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import LoginImage from "../assets/Secure login-rafiki.png";
import { Link } from "react-router-dom";
import "../index.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/api/v1/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          // console.log(res.data);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          toast.success("Successfully Login", {
            position: "top-right",
          });
          Cookies.set("jwt", res.data.token);

          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
        });
        localStorage.removeItem("user");
        console.log(err);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center my-48">
        <div className="text-center mb-8 md:mb-0">
          <img
            src={LoginImage}
            className="w-3/4 md:w-96 h-auto mx-auto"
            alt="Login"
          />
        </div>
        <div className="border p-4 text-center w-full md:w-96">
          <form className="mt-4">
            <h1 className="custom-color text-3xl">Welcome Back</h1>
            <p className="custom-color-p m-4">Please login to continue ..</p>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full p-2 border border-gray-300 rounded outline-none"
                value={email}
                onChange={onChangeEmail}
              />
            </div>
            <div className="mb-3">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-2 border border-gray-300 rounded outline-none"
                  value={password}
                  onChange={onChangePassword}
                />
                <span
                  className="absolute right-4 top-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20.25 14.73a10.14 10.14 0 01-1.47-1.86c.03-.19.06-.38.06-.57a7.25 7.25 0 00-14.5 0c0 .19.02.38.06.57a10.14 10.14 0 01-1.47 1.86A8.75 8.75 0 000 17.75 8.75 8.75 0 0017.75 0a8.75 8.75 0 008.75 8.75 8.75 8.75 0 000-17.5zM3 7a5 5 0 004.36 4.95 6.75 6.75 0 00.69.05 6.25 6.25 0 001.69-.23 6.25 6.25 0 00-1.94-1.94 6.25 6.25 0 00-1.94 1.94 6.25 6.25 0 00-1.94-1.94A6.25 6.25 0 003 7zM11 7a3 3 0 116 0 3 3 0 01-6 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.171 14.828A13.963 13.963 0 0112 20.5c-3.367 0-6.482-1.208-8.878-3.235m3.005-3.005a2 2 0 102.828-2.828"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="w-full p-2 bg-custom-color text-white rounded"
                onClick={onSubmit}
              >
                Login
              </button>
            </div>
          </form>
          <br />
          <p className="custom-color">Don’t have an account?</p>
          <Link to="/signup" className="custom-color text-decoration-none">
            Signup
          </Link>
        </div>
      </div>
    </>
  );
}
