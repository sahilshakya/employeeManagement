import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { user, token, BASE_URL } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!oldPassword || !newPassword) return;
    const res = await fetch(`${BASE_URL}/users/${user._id}/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <div>
      <form className="p-5" onSubmit={handleSubmit}>
        <label className="text-gray-700 text-lg font-bold mb-4">Email</label>
        <input
          className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-4  focus:bg-white"
          type="text"
          value={user?.email}
          disabled
        />

        <label className="text-gray-700 text-lg font-bold mb-4">
          Old Password
        </label>

        <input
          className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-4  focus:bg-white"
          type="password"
          value={oldPassword}
          placeholder="Enter your old password"
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <label className="text-gray-700 text-lg font-bold mb-4">
          New Password
        </label>
        <input
          className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-4  focus:bg-white"
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className="bg-blue-500 p-3 rounded-lg text-white text-lg mt-3">
          Change
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
