import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [Loged, setLoged] = useState("");
  const [showLogin, setShowLogin] = useState("");

  return (
    <div className="hidden sm:block">
      <div className="flex space-x-4 text-white text-gray-300 hover:bg-gray-700 hover:text-white Nav">
        <a
          href="/Login"
          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-12 py-2 text-b font-medium"
          aria-current="page"
        >
          Profile
        </a>
        <a
          href="/Home"
          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-12 py-2 text-b font-medium"
        >
          Home
        </a>
        {Loged === true ? (
          <>
            <User />
            <p
              className="Count"
              className="text-gray-300 hover:bg-gray-700 hover:text-white ml:8 mr:8 rounded-md px-3 py-2 text-sm "
            >
              {" "}
              My tweets : <Count />{" "}
            </p>
            <button
              className="text-gray-300 hover:bg-gray-700 hover:text-white ml:8 mr:8 rounded-md px-3 py-2 text-base"
              onClick={() => {
                localStorage.removeItem("userId");
                setLoged(false);
                sessionStorage.setItem("loged", false)
              }}
            >
              Log me out
            </button>
          </>
        ) : (
          <>
            {showLogin && (
              <>
                <button
                  onClick={() => {
                    navigate("/Login");
                    setShowLogin(true);
                  }}
                >
                  Log me in
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
