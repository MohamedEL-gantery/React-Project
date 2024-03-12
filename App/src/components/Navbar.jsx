/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import axios from "axios";
import Cookies from "js-cookie";

export default function Navbar() {
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user") != null)
      setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const logout = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8000/api/v1/auth/logout")
      .then((res) => {
        localStorage.removeItem("user");
        setUser("");
        window.location.reload();
        Cookies.remove("jwt", res.data.token);
        // console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {user !== "" ? (
        <>
          <div className="navbar bg-custom-color text-white">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Link to="/" className="btn btn-ghost text-xl  text-white">
                  Home
                </Link>
              </div>
              <input
                type="text"
                placeholder="Search"
                className="input w-1/3 input-bordered bg-white outline-none rounded-full px-4 py-2 text-black"
              />
              <div className="dropdown">
                <button className="btn btn-ghost btn-circle">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={user.media}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
                <ul className="menu dropdown-content bg-custom-color text-white rounded-box p-1 w-32">
                  <li>
                    <Link to="/me">Profile</Link>
                  </li>
                  <li>
                    <button type="submit" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="navbar bg-custom-color text-white">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="dropdown  text-white">
                  <button className="btn btn-ghost  text-white">
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
                        d="M4 6h16M4 12h8m-8 6h16"
                      />
                    </svg>
                  </button>
                  <ul className="menu dropdown-content shadow-lg bg-custom-color text-white rounded-box p-1 w-32">
                    <li>
                      <Link
                        to="/login"
                        className=" text-white text-decoration-none"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className=" text-white text-decoration-none"
                      >
                        signup
                      </Link>
                    </li>
                  </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl  text-white">
                  Home
                </Link>
              </div>
              <input
                type="text"
                placeholder="Search"
                className="input w-1/3 input-bordered bg-white outline-none rounded-full px-4 py-2 text-black "
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
