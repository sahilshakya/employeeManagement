import { Route, Routes } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList";
// import Navbar from "./components/Navbar";
import EmployeeForm from "./pages/EmployeeForm";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/create" element={<EmployeeForm />} />
          <Route path="/employees/:employeeId" element={<EmployeeForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
