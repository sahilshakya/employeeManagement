import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList";
// import Navbar from "./components/Navbar";
import EmployeeForm from "./pages/EmployeeForm";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import ChangePassword from "./pages/ChangePassword";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <div>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route element={<Layout />}>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employees"
                  element={
                    <ProtectedRoute>
                      <EmployeeList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employees/create"
                  element={
                    <ProtectedRoute>
                      <EmployeeForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employees/:employeeId"
                  element={
                    <ProtectedRoute>
                      <EmployeeForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/change-password"
                  element={
                    <ProtectedRoute>
                      <ChangePassword />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
