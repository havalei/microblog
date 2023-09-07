import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";

function Profile() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  function Change() {
    console.log("user :", user);
    if (userName) {
      localStorage.setItem("userName", JSON.stringify(userName));
    }
    if (password) {
      localStorage.setItem("password", JSON.stringify(password));
    }

    setUser({
      ...user,
      userName: userName || user.userName,
      password: password || user.password,
    });

    console.log("user : ", user);
    console.log("user Id : ", user.userId);

    SaveUser({
      userName: userName || user.userName,
      password: password || user.password,
    });
  }

  async function SaveUser(updatedUser) {
    try {
      const response = await fetch(
        `https://64cf7ff0ffcda80aff51ee5e.mockapi.io/users/:${user.userId}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ updatedUser }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("your user has been updated", data);
      }
    } catch (error) {
      console.log("we have an error during the update: ", error);
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Would you like to change your info ?
        </h2>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your new User Name
                </label>
                <input
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="New User Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  // onChange={(e) =>
                  //   setUser((prev) => ({ ...prev, password: e.target.value }))}
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your new Password
                </label>
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-start"></div>
              <button
                type="button"
                className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={() => Change()}
              >
                Make the changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
