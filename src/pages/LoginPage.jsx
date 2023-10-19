import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { login, user, isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const regExp = /^(?:.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    // if (password === "") {
    //   setErrorMessage("please enter password");
    // } else if (!regExp.test(password)) {
    //   setErrorMessage("password is not Valid");
    // } else {
    //   setErrorMessage("");
    // }
    await login(email, password);
  };

  useEffect(
    function () {
      if (isAuthenticated && user?.role.toLowerCase() === "admin")
        navigate("/dashboard");
      if (isAuthenticated && user?.role.toLowerCase() === "employee")
        navigate("/change-password");
    },
    [isAuthenticated, user?.role, navigate]
  );

  return (
    <>
      <section className="bg-gray-700">
        <div className="flex flex-col items-center justify-center px-6 py-8 h-screen ">
          <h1 className=" mb-6 text-2xl font-semibold text-white">
            Employee Login
          </h1>
          <div className="w-full rounded-lg  border max-w-md bg-gray-800 border-gray-700">
            <div className="p-6 ">
              <h1 className="text-xl font-bold text-white mb-3">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    className=" border  rounded-lg  w-full p-2.5 bg-gray-700 border-gray-600  text-white "
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your Password"
                    className=" border  rounded-lg  w-full p-2.5 bg-gray-700 border-gray-600  text-white "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* <p className="text-xs text-red-700">{errorMessage}</p> */}
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full text-white bg-blue-500 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
