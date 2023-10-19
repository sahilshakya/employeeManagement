import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../contexts/AuthContext";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { user, token } = useAuth();

  const getEmployees = async () => {
    const resp = await axios.get("http://localhost:8000/api/users");
    // console.log(resp.data);

    setEmployees(resp.data.data);
  };

  const handleDelete = async (id) => {
    const resp = await fetch(`http://localhost:8000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await resp.json();

    setEmployees((existingEmployees) =>
      existingEmployees.filter((employee) => employee._id !== data.data._id)
    );
    toast.success("employee deleted");
  };

  const handleSort = (column) => {
    const sortedData = [...employees];

    sortedData.sort((a, b) => {
      const valA = a[column].toLowerCase();
      const valB = b[column].toLowerCase();

      if (valA < valB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (valA > valB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    setEmployees(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      <div className=" flex justify-between p-5 ">
        <Link to="/employees/create">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800  rounded-full text-lg p-2 text-center "
          >
            Add employee
          </button>
        </Link>
        <div className="">
          <input
            placeholder="Search"
            className="border border-gray-500 bg-gray-100  text-lg rounded-lg p-2"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="p-5">
        <table className="mt-4 w-full b  text-center">
          <thead>
            <tr>
              <th onClick={() => handleSort("firstName")}>
                First Name{" "}
                {sortOrder === "asc" ? (
                  <span className=" inline-block ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </span>
                ) : (
                  <span className=" inline-block ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                )}
              </th>
              <th onClick={() => handleSort("firstName")}>
                Last Name
                {sortOrder === "asc" ? (
                  <span className=" inline-block ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </span>
                ) : (
                  <span className=" inline-block ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                )}
              </th>
              <th onClick={() => handleSort("email")}>
                Email{" "}
                {sortOrder === "asc" ? (
                  <span className=" inline-block ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </span>
                ) : (
                  <span className=" inline-block ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                )}
              </th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees
              ?.filter((employee) => {
                return search.toLowerCase() === ""
                  ? employee
                  : employee.firstName.toLowerCase().includes(search) ||
                      employee.lastName.toLowerCase().includes(search) ||
                      employee.email.toLowerCase().includes(search) ||
                      employee.role.toLowerCase().includes(search);
              })
              .map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>

                  <td className="">
                    <Link
                      to={`/employees/${employee._id}`}
                      className="border border-gray-200 p-3 rounded-md bg-green-400 text-white text-bold mr-2"
                    >
                      Update
                    </Link>
                    <button
                      className="border border-gray-200 p-3 rounded-md bg-red-600 text-white text-boldds"
                      onClick={() => handleDelete(employee._id)}
                      disabled={user?._id === employee._id}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeList;
