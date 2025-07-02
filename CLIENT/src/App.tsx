import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import DashboardLayout from "./layout/DashboardLayout";
import { AuthContextProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./layout/AdminLayout";
import Post from "./pages/admin/Post";
import UserLayout from "./layout/UserLayout";
import ClerksLayout from "./layout/ClerksLayout";
import Home from "./pages/admin/Home";
import C_Home from "./pages/clerks/C_Home";
import { Toaster } from "react-hot-toast";
import C_createActivity from "./pages/clerks/C_createActivity";

const App = () => {
  return (
    <>
    <Toaster/>
      <Routes>
        <Route index element={<Landing />} />

        <Route
          path="/dashboard"
          element={
            <AuthContextProvider>
              <DashboardLayout />
            </AuthContextProvider>
          }
        >
          <Route index element={<Dashboard />} />
          {/* admin layout */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Home />} />
            <Route path="post" element={<Post />} />
          </Route>
          <Route path="user" element={<UserLayout />}></Route>
          <Route path="clerk" element={<ClerksLayout />}>
            <Route index element={<C_Home />} />
            <Route path="create-activity" element={<C_createActivity />} />

          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
