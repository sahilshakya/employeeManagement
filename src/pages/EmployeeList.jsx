import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
// import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const getEmployees = async () => {
    const resp = await fetch("http://localhost:8000/api/users");
    const data = await resp.json();
    // console.log(data.data);
    setEmployees(data.data);
  };

  const handleDelete = async (id) => {
    const resp = await fetch(`http://localhost:8000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await resp.json();
    setEmployees((existingEmployees) => {
      existingEmployees.filter((employee) => {
        employee._id !== data.data._id;
      });
    });
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      <Navbar />
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
          />
        </div>
      </div>

      <div className="p-5">
        <table className="mt-4 w-full b  text-left">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>
                  {employee.firstName} {employee.lastName}
                </td>
                <td>{employee.email}</td>
                <td>{employee.isAdmin ? "Admin" : "Employee"}</td>

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
