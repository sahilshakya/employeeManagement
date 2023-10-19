import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { logout, user } = useAuth();

  return (
    <nav className="border-gray-200 bg-gray-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={`${
            user?.role.toLowerCase() === "admin"
              ? "/dashboard"
              : "change-password"
          }`}
        >
          <span className="self-center text-2xl font-semibold  dark:text-white">
            EmployeeSoftware
          </span>
        </Link>

        <ul className=" flex">
          {user?.role.toLowerCase() === "admin" && (
            <li>
              <Link to="/dashboard" className=" py-2 pl-3 pr-4 text-white ">
                Dashboard
              </Link>
            </li>
          )}
          {user?.role.toLowerCase() === "admin" && (
            <li>
              <Link to="/employees" className=" py-2 pl-3 pr-4 text-white ">
                Employees
              </Link>
            </li>
          )}

          <li>
            <Link to="/change-password" className=" py-2 pl-3 pr-4 text-white ">
              Change Password
            </Link>
          </li>
          <li>
            <button onClick={logout} className="  pl-3 pr-4 text-white ">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
