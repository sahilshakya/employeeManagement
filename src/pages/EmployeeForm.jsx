import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeForm = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState(false);
  // const [fnameError, setfnameError] = useState("");
  // const [lnameError, setlnameError] = useState("");
  // const [emailError, setemailError] = useState("");
  // const [phoneError, setphoneError] = useState("");
  // const [addressError, setaddressError] = useState("");
  // const [passwordError, setpasswordError] = useState("");

  // const [message, setMessage] = useState("");

  const { employeeId } = useParams();
  // console.log(employeeId);

  // const validateForm = () => {
  //   if (firstName.trim() === "") {
  //     setfnameError("First Name is required");
  //     return false;
  //   }
  //   setfnameError("");
  //   if (lastName.trim() === "") {
  //     setlnameError(" Last Name is required");
  //     return false;
  //   }
  //   setlnameError("");
  //   if (email.trim() === "") {
  //     setemailError(" Email is required");
  //     return false;
  //   }
  //   setemailError("");
  //   if (address.trim() === "") {
  //     setaddressError(" Address is required");
  //     return false;
  //   }
  //   setaddressError("");
  //   if (phone.toString().trim === "") {
  //     setphoneError(" 10 digit Phone is required");
  //     return false;
  //   }
  //   setphoneError("");

  //   if (password.trim() === "") {
  //     setpasswordError(" Password is required");
  //     return false;
  //   }
  //   setpasswordError("");
  //   return true;
  // };

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
      navigate("/employees");
      toast.success("Employee Added");
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
      toast.success("Employee updated");
    }
  }
  const submit = async (e) => {
    e.preventDefault();
    // const isValid = validateForm();
    const userData = {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      role,
    };
    // const emailRgExp = /^[a-zA-Z0-9._]+[a-z]+\.[a-z]{2-6}&/;
    // if (emailRgExp.test(email)) {
    //   setMessage("Email is invalid");
    // } else if (email === "") {
    //   setMessage("Please enter Email");
    // } else {
    //   setMessage("");
    // }
    // if (isValid) {
    employeeId ? update(userData) : create(userData);
    // }
  };

  useEffect(() => {
    async function getEmployeeById() {
      const resp = await fetch(
        `http://localhost:8000/api/users/${employeeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await resp.json();
      // console.log(data.data);
      setFirstName(data.data.firstName);
      setLastName(data.data.lastName);
      setEmail(data.data.email);
      setPhone(data.data.phone);
      setAddress(data.data.address);
      setRole(data.data.role);
    }
    if (employeeId) getEmployeeById();
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
        {/* {fnameError && <p className="text-red-600 text-xs">{fnameError}</p>} */}

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
        {/* {lnameError && <p className="text-red-600 text-xs">{lnameError}</p>} */}

        <label className="text-gray-700 text-lg font-bold mb-4">Email</label>
        <input
          className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-4  focus:bg-white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={employeeId ? true : false}
        />
        {/* {emailError && <p className="text-red-600 text-xs">{emailError}</p>} */}

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
            {/* {passwordError && (
              <p className="text-red-600 text-xs">{passwordError}</p>
            )} */}
          </>
        )}

        <label className="text-gray-700 text-lg font-bold mb-4">Phone</label>
        <input
          className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-4  focus:bg-white"
          type="number"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {/* {phoneError && <p className="text-red-600 text-xs">{phoneError}</p>} */}

        <label className="text-gray-700 text-lg font-bold mb-4">Address</label>
        <input
          className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-4  focus:bg-white"
          type="text"
          placeholder="Employee Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {/* {addressError && <p className="text-red-600 text-xs">{addressError}</p>} */}

        <label className="text-gray-700 text-lg font-bold mb-4">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        >
          <option value="Admin">Admin</option>
          <option value="Employee">Employee</option>
        </select>

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
