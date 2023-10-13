import { Link } from "react-router-dom";

const EmployeeList = () => {
  return (
    <>
      <div>
        <Link to="/create-employee">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800  rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Add employee
          </button>
        </Link>
      </div>

      <table className="mt-10 ">
        <thead>
          <tr>
            <td>Employee Name</td>
            <td>Email</td>
            <td>Salary</td>
            <td>DOB</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </>
  );
};

export default EmployeeList;
