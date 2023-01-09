import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toggleSidebarSelector } from "../app/toogleSidebarSlice";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import loginSlice, {
  selectCurrentToken,
} from "../features/login/redux/loginSlice";
const Master = () => {
  const sidebarStatus = useSelector(toggleSidebarSelector);
  const token = useSelector(selectCurrentToken);

  if (!token) return <Navigate to="/login" replace={true} />;

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Sidebar />
      <main
        className={`${sidebarStatus ? "ml-[50px] lg:ml-[250px]" : "ml-[50px]"}`}
      >
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};

export default Master;
