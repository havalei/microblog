import React, { useContext, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { v4 as uuidv4 } from "uuid";

export default function SignIn() {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  function create() {
    if (user.userName === "") {
      alert("Please fill in User Name");
    } else if (user.password === "") {
      alert("Please fill in password");
    } else if (user.userName === "" && user.password === "") {
      alert("Please fill in User Name and password");
    } else {
      const updatedUser = {
        userName: user.userName,
        password: user.password,
        userId: uuidv4(),
      };
      localStorage.setItem("userName", JSON.stringify(updatedUser.userName));
      localStorage.setItem("password", JSON.stringify(updatedUser.password));
      localStorage.setItem("userId", JSON.stringify(updatedUser.userId));

      setUser(updatedUser);

      console.log("user in signin : ", updatedUser);
      SaveNewUser(updatedUser);
      alert(
        "Your account has been created, please log in to see and send tweets"
      );
      navigate("/Login");
    }
  }

  async function SaveNewUser(user) {
    try {
      const response = await fetch(
        `https://64cf7ff0ffcda80aff51ee5e.mockapi.io/users`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("User created successfully in the api:", data);
      }
    } catch (error) {
      console.log("we couldnt create the new user: ", error);
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          You are about to entire the virtual World...
        </h2>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your User Name
                </label>
                <input
                  name="userName"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Ad Avi"
                  value={user.userName || ""}
                  onChange={(e) => setUser({ userName: e.target.value })}
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {" "}
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder="••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-start"></div>
              <button
                type="button"
                className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={create}
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/Login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
