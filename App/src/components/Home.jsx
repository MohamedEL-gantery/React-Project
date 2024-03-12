/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("user") != null)
      setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const getAllPosts = () => {
    axios
      .get("http://localhost:8000/api/v1/posts")
      .then((res) => {
        if (res.data.status === "success") {
          // console.log(res.data.data);
          setPosts(res.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllPosts();
  }, [posts]);

  const deletePost = (e, id) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:8000/api/v1/posts/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === "success") {
          console.log(res.data);
          toast.success("Successfully", {
            position: "top-right",
          });
          const updatedPosts = posts.filter((post) => post._id !== id);
          setPosts(updatedPosts);
          getAllPosts();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
        });
        // console.log(err);
      });
  };

  return (
    <>
      <ToastContainer />
      {loading ? (
        <div className="flex items-center justify-center h-screen ">
          <div className="text-center">
            <div className="text-4xl font-bold mb-4 custom-color">
              Loading...
            </div>
            <span className="loading loading-dots loading-lg custom-color"></span>
          </div>
        </div>
      ) : (
        <div>
          {user !== "" ? (
            <div>
              <div className="fixed bottom-0 right-0 m-4">
                <div className="text-center">
                  <Link
                    className="btn bg-custom-color text-white w-50 mt-4"
                    to="/createPost"
                  >
                    Add Post
                  </Link>
                </div>
              </div>
              {posts.map((post) => {
                return (
                  <div
                    className="flex items-center justify-center mt-14"
                    key={post.id}
                  >
                    <div className="card w-1/3 bg-custom-color text-white shadow-xl rounded-md overflow-hidden">
                      <div className="card-body p-6">
                        <div className="flex items-center mb-4">
                          {post.user._id === user._id && (
                            <div className="dropdown">
                              <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle"
                              >
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
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                              <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white custom-color rounded-box w-52"
                              >
                                <li>
                                  <Link to={`/update/${post._id}`}>
                                    UpdatePost
                                  </Link>
                                </li>
                                <li>
                                  <button
                                    onClick={(e) => deletePost(e, post._id)}
                                  >
                                    DeletePost
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                          <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                            <img
                              src={post.user.media}
                              alt="Avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h2 className="card-title text-xl font-semibold ">
                              {post.user.name}
                            </h2>
                            {new Date(post.createdAt).getHours() > 1 ? (
                              <>
                                <p className="text-white">
                                  {new Date(post.createdAt).getHours()} hours
                                  ago
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="text-white">
                                  {new Date(post.createdAt).getMinutes()}{" "}
                                  Minutes ago
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        <p className="text-base">{post.description}</p>
                      </div>
                      <img
                        src={post.media}
                        alt="photo"
                        className="rounded-md w-full  object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {posts.slice(0, 3).map((post) => {
                return (
                  <div
                    className="flex items-center justify-center mt-16"
                    key={post.id}
                  >
                    <div className="card w-1/3 bg-custom-color text-white shadow-xl rounded-md overflow-hidden">
                      <div className="card-body p-6">
                        <div className="flex items-center mb-4">
                          {/* ... */}
                          <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                            <img
                              src={post.user.media}
                              alt="Avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h2 className="card-title text-xl font-semibold ">
                              {post.user.name}
                            </h2>
                            {new Date(post.createdAt).getHours() > 1 ? (
                              <>
                                <p className="text-white">
                                  {new Date(post.createdAt).getHours()} hours
                                  ago
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="text-white">
                                  {new Date(post.createdAt).getMinutes()}{" "}
                                  Minutes ago
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        <p className="text-base">{post.description}</p>
                      </div>
                      <img
                        src={post.media}
                        alt="photo"
                        className="rounded-md w-full  object-cover"
                      />
                    </div>
                  </div>
                );
              })}
              <div className="text-center ">
                <h2 className="custom-color text-4xl m-4">To See More Posts</h2>
                <Link
                  className="btn bg-custom-color text-white w-50 m-4"
                  to="/login"
                >
                  login to continue
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
