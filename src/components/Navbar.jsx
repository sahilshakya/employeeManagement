import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  function logout() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <nav className="border-gray-200 bg-gray-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/dashboard">
          <span className="self-center text-2xl font-semibold  dark:text-white">
            EmployeeSoftware
          </span>
        </Link>

        <ul className=" flex">
          <li>
            <Link to="/dashboard" className=" py-2 pl-3 pr-4 text-white ">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/employees" className=" py-2 pl-3 pr-4 text-white ">
              Employees
            </Link>
          </li>

          <li>
            <button onClick={logout} className=" py-2 pl-3 pr-4 text-white ">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
