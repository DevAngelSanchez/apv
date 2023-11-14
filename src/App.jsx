import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layout/AuthLayout";
import ProtectedRoute from "./layout/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import NewPassword from "./pages/NewPassword";
import AdminPatients from "./pages/Admin/AdminPatients";
import EditProfile from "./pages/Admin/EditProfile";
import ChangePass from "./pages/Admin/ChangePass";

import { AuthProvider } from "./context/AuthProvider";
import { PatientsProvider } from './context/PatientProvider';

function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <PatientsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="reset-password/:token" element={<NewPassword />} />
              <Route path="confirm-account/:id" element={<ConfirmAccount />} />
            </Route>
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route index element={<AdminPatients />} />
              <Route path="/admin/profile" element={<EditProfile />} />
              <Route path="/admin/change-password" element={<ChangePass />} />
            </Route>
          </Routes>
        </PatientsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
