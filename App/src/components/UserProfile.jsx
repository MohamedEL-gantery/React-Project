/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import errorImage from "../assets/error.jpg";

export default function UserProfile() {
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user") != null)
      setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <>
      {user !== "" ? (
        <>
          <div className="container mx-auto my-20 flex flex-col md:flex-row items-center justify-center">
            <div className="text-center mb-8 md:mb-0"></div>
            <div className="border p-8 text-center w-full md:w-2/3 bg-white shadow-lg rounded-md">
              <div className="mb-6 flex flex-col items-center">
                <div className="avatar mb-3">
                  <div className="w-24 rounded-xl">
                    <img src={user.media} alt="user-avatar" />
                  </div>
                </div>
                <div className="flex">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-3">
                      <label className="block text-sm font-medium custom-color">
                        Email
                      </label>
                      <input
                        type="text"
                        value={user.email}
                        className="w-80 p-3 border border-gray-300 rounded-md outline-none"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium custom-color">
                        Name
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        className="w-80 p-3 border border-gray-300 rounded-md outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-center ">
            <h2 className="custom-color text-4xl m-2">
              Uh oh! Something went wrong!
            </h2>
            <h2 className="custom-color text-4xl m-2">.error__emoji 😢 🤯</h2>
            <div className="mx-auto max-w-screen-lg">
              <img src={errorImage} className="max-w-4xl mx-auto" alt="Error" />
            </div>
            <Link
              className="btn bg-custom-color text-white w-50 m-4"
              to="/login"
            >
              Login To Access This Page
            </Link>
          </div>
        </>
      )}
    </>
  );
}
