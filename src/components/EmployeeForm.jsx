import { useState } from "react";

const EmployeeForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [date, setDate] = useState("");
  const addData = (e) => {
    e.preventDefault();
    const data = { name, email, salary, date };
  };
  return (
    <div>
      <h1>Add Employess</h1>

      <form className="p-5">
        <label className="text-gray-700 text-lg font-bold mb-4">
          Employee Name
        </label>
        <input
          className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-4  focus:bg-white"
          type="text"
          placeholder="Employee Name"
          onChange={(e) => setName(e.target.value)}
        />
        <label className="text-gray-700 text-lg font-bold mb-4">Email</label>
        <input
          className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-4  focus:bg-white"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="text-gray-700 text-lg font-bold mb-4">Salary</label>
        <input
          className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-4  focus:bg-white"
          type="number"
          placeholder="Salary"
          onChange={(e) => setSalary(e.target.value)}
        />
        <label className="text-gray-700 text-lg font-bold mb-4">Date</label>
        <input
          className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-4  focus:bg-white"
          type="date"
          placeholder="Position"
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          className="bg-blue-500 p-3 rounded-lg text-white text-lg"
          onClick={addData}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
