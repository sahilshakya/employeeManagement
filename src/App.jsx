import { Route, Routes } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import Navbar from "./components/Navbar";
import EmployeeForm from "./components/EmployeeForm";

function App() {
  return (
    <>
      <Navbar />

      <div>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/create-employee" element={<EmployeeForm />} />
          <Route path="/edit-empployee" element={<EmployeeForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
