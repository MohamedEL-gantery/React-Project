/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import errorImage from "../assets/error.jpg";

export default function UpdatePost() {
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user") != null)
      setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeImage = (e) => {
    setMedia(e.target.files[0]);
  };

  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/posts/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setDescription(res.data.data.description);
          setMedia(res.data.data.media);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description", description);
    formData.append("media", media);

    axios
      .patch(`http://localhost:8000/api/v1/posts/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status === "success") {
          console.log(res.data);
          toast.success("Post updated successfully", {
            position: "top-right",
          });
          setDescription(res.data.data.description);
          setMedia(res.data.data.media);
          navigate(`/getPost/${id}`);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
        });
        console.error(err);
      });
  };

  return (
    <>
      {user !== "" ? (
        <>
          <ToastContainer />

          <div className="container mx-auto my-20 flex flex-col md:flex-row items-center justify-center">
            <div className="text-center mb-8 md:mb-0"></div>
            <div className="border p-8 text-center w-full md:w-2/3 bg-white shadow-lg rounded-md">
              <form className="mt-4">
                <h1 className="text-3xl font-bold custom-color mb-6">
                  Update Post
                </h1>
                <div className="mb-6">
                  <img src={media} className="m-4 w-full" />
                  <div className="relative flex items-center justify-center">
                    <input
                      type="file"
                      id="file"
                      name="file"
                      className="w-full p-3 border border-gray-300 rounded-md outline-none  "
                      onChange={onChangeImage}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="postTitle"
                    className="block text-left text-sm font-medium custom-color-p mb-2"
                  >
                    Post Title
                  </label>
                  <input
                    type="text"
                    id="postTitle"
                    placeholder="Enter post title"
                    className="w-full p-3 border border-gray-300 rounded-md outline-none"
                    value={description}
                    onChange={onChangeDescription}
                  />
                </div>
                <div className="mb-6">
                  <button
                    type="submit"
                    className="w-80 p-3 bg-custom-color text-white rounded-md hover:bg-opacity-80 focus:outline-none"
                    onClick={updatePost}
                  >
                    Update
                  </button>
                </div>
              </form>
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
