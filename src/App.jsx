import { Routes, Route } from "react-router-dom";
import Login from "./features/login/pages/Login";
import Master from "./layouts/Master";
import Dashboard from "./features/dashboard/pages/Dashboard";
import UsersList from "./features/users/pages/UsersList";
import NotFound from "./layouts/NotFound";
import { NewUser } from "./features/users/pages/NewUser";
import EditUser from "./features/users/pages/EditUser";
import PersistLogin from "./features/login/components/PersistLogin";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Master />}>
          <Route index element={<Dashboard />} />
          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path="new" element={<NewUser />} />
            <Route path=":id/edit" element={<EditUser />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
