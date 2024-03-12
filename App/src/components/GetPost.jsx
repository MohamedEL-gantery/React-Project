/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import errorImage from "../assets/error.jpg";
import { Link, useParams } from "react-router-dom";

export default function GetPost() {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [user, setUser] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user") != null)
      setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/posts/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setDescription(res.data.data.description);
          setMedia(res.data.data.media);
          setTime(res.data.data.createdAt);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {user !== "" ? (
        <div>
          <div className="fixed bottom-0 right-0 m-4"></div>
          <div className="flex items-center justify-center mt-14">
            <div className="card w-1/3 bg-custom-color text-white shadow-xl rounded-md overflow-hidden">
              <div className="card-body p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img
                      src={user.media}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="card-title text-xl font-semibold">
                      {user.name}
                    </h2>
                    <p className="text-white">
                      {new Date(time).getHours()} hours ago
                    </p>
                  </div>
                </div>
                <p className="text-base">{description}</p>
              </div>
              <img
                src={media}
                alt="photo"
                className="rounded-md w-full object-cover"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center ">
          <h2 className="custom-color text-4xl m-2">
            Uh oh! Something went wrong!
          </h2>
          <h2 className="custom-color text-4xl m-2">.error__emoji 😢 🤯</h2>
          <div className="mx-auto max-w-screen-lg">
            <img src={errorImage} className="max-w-4xl mx-auto" alt="Error" />
          </div>
          <Link className="btn bg-custom-color text-white w-50 m-4" to="/login">
            Login To Access This Page
          </Link>
        </div>
      )}
    </>
  );
}
