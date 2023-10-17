import React from "react";
import Navbar from "../components/Navbar";

const ChangePassword = () => {
  return (
    <div>
      <div>
        <Navbar />

        <h1 className="p-4 text-3xl">
          {employeeId ? "Update" : "Add"} Employee
        </h1>

        <form className="p-5">
          <label className="text-gray-700 text-lg font-bold mb-4">
            First Name
          </label>
          <input
            className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-4  focus:bg-white"
            type="text"
            placeholder="Employee First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label className="text-gray-700 text-lg font-bold mb-4">
            {" "}
            Last Name
          </label>
          <input
            className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-4  focus:bg-white"
            type="text"
            value={lastName}
            placeholder="Employee Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />

          <button
            className="bg-blue-500 p-3 rounded-lg text-white text-lg mt-3"
            onClick={submit}
          >
            {employeeId ? "UPDATE" : "ADD"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
