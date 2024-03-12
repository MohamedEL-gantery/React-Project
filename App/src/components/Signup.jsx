/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signupImage from "../assets/Sign up-rafiki.png";
import "../index.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [media, setMedia] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const onChangeImage = (e) => {
    setMedia(e.target.files[0]);
  };

  const validateInputs = () => {
    name === ""
      ? toast.error("Name is required.", { position: "top-right" })
      : name.length <= 3
      ? toast.error("Name must be more than 3 characters.", {
          position: "top-right",
        })
      : email === ""
      ? toast.error("Email is required.", { position: "top-right" })
      : password === ""
      ? toast.error("Password is required.", { position: "top-right" })
      : password.length <= 7
      ? toast.error("Enter a strong password.", { position: "top-right" })
      : password !== passwordConfirm
      ? toast.error("Password does not match PasswordConfirm.", {
          position: "top-right",
        })
      : true;

    return false;
  };

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    validateInputs();
    const formData = new FormData();
    formData.append("media", media);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("passwordConfirm", passwordConfirm);

    axios
      .post("http://localhost:8000/api/v1/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status === "success") {
          // console.log(res.data);
          toast.success("Successfully registered", {
            position: "top-right",
          });
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
        });
        console.log(err);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto my-48 flex flex-col md:flex-row items-center justify-center">
        <div className="text-center mb-8 md:mb-0">
          <img
            src={signupImage}
            className="w-3/4 md:w-96 h-auto mx-auto"
            alt="Login"
          />
        </div>
        <div className="border p-4 text-center w-full md:w-96">
          <form className="mt-4" action="POST">
            <h1 className="custom-color text-3xl">Create an account,</h1>
            <p className="custom-color-p m-4">
              Let’s create an account together
            </p>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Enter name"
                className="w-full p-2 border border-gray-300 rounded  outline-none"
                value={name}
                onChange={onChangeName}
              />
            </div>
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
                  className="w-full p-2 border border-gray-300 rounded  outline-none"
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
              <div className="relative">
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="PasswordConfirm"
                  className="w-full p-2 border border-gray-300 rounded outline-none"
                  value={passwordConfirm}
                  onChange={onChangePasswordConfirm}
                />
                <span
                  className="absolute right-4 top-3 cursor-pointer"
                  onClick={togglePasswordConfirmVisibility}
                >
                  {showPasswordConfirm ? (
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
            <div className="mb-3 relative flex items-center justify-center">
              <input
                type="file"
                id="image"
                accept="image/*"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={onChangeImage}
              />
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="w-full p-2 bg-custom-color text-white rounded"
                onClick={onSubmit}
              >
                Sign up
              </button>
            </div>
          </form>
          <br />
          <p className="custom-color">Already have an account?</p>
          <Link to="/login" className="custom-color text-decoration-none">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
