import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeForm = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // const [role, setRole] = useState("");

  const { employeeId } = useParams();
  // console.log(employeeId);

  async function create(userData) {
    const resp = await fetch(`http://localhost:8000/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(userData),
    });
    const data = await resp.json();
    // console.log(data);

    if (data) {
      // navigate("/employees");
    }
  }

  async function update(userData) {
    delete userData.password;
    const resp = await fetch(`http://localhost:8000/api/users/${employeeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(userData),
    });
    const data = await resp.json();
    if (data) {
      navigate("/employees");
    }
  }
  const submit = async (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
    };
    employeeId ? update(userData) : create(userData);
  };

  useEffect(() => {
    async function getEmployeeById() {
      const resp = await fetch(`http://localhost:8000/api/users/${employeeId}`);
      const data = await resp.json();
      // console.log(data.data);
      setFirstName(data.data.firstName);
      setLastName(data.data.lastName);
      setEmail(data.data.email);
      setPhone(data.data.phone);
      setAddress(data.data.address);
    }
    getEmployeeById();
  }, [employeeId]);
  return (
    <div>
      <Navbar />

      <h1 className="p-4 text-3xl">{employeeId ? "Update" : "Add"} Employee</h1>

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
        <label className="text-gray-700 text-lg font-bold mb-4">Email</label>
        <input
          className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-4  focus:bg-white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={employeeId ? true : false}
        />
        {!employeeId && (
          <>
            <label className="text-gray-700 text-lg font-bold mb-4">
              Password
            </label>

            <input
              className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-4  focus:bg-white"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        {/* <label className="text-gray-700 text-lg font-bold mb-4">Role</label>
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ">
          <option selected>Choose a role</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select> */}
        <label className="text-gray-700 text-lg font-bold mb-4">Phone</label>
        <input
          className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-4  focus:bg-white"
          type="number"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label className="text-gray-700 text-lg font-bold mb-4">Address</label>
        <input
          className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-4  focus:bg-white"
          type="text"
          placeholder="Employee Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          className="bg-blue-500 p-3 rounded-lg text-white text-lg mt-3"
          onClick={submit}
        >
          {employeeId ? "UPDATE" : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
