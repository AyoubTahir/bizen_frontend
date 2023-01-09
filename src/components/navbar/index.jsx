import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../features/login/redux/api/loginApiSlice";
import usePersist from "../../features/login/hooks/usePersist";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [logout, { isLoading, isSuccess, isError, error }] =
    useLogoutMutation();

  if (dropdownMenu) {
    document.addEventListener("click", function (event) {
      const outsideClick = !document
        .querySelector("#dropdown")
        .contains(event.target);
      console.log(outsideClick);
      if (outsideClick) setDropdownMenu(!dropdownMenu);
    });
  }

  if (isSuccess) {
    setTimeout(() => {
      navigate("/login");
    }, 100);
  }

  return (
    <div className="h-[58px] shadow flex justify-between items-center px-2 sm:px-4">
      <h3 className="font-bold text-md sm:text-lg">Welcome Admin 👋</h3>
      <div
        id="dropdown"
        className="flex items-center gap-2 relative cursor-pointer"
        onClick={() => setDropdownMenu(!dropdownMenu)}
      >
        <img
          className="w-10 h-10 rounded-full"
          src="https://searchengineland.com/wp-content/seloads/2017/07/image-search-ss-1920.gif"
        />
        <h1 className="font-bold w-full">Tahir Ayoub</h1>
        <HiChevronDown className="h-5 w-5" />
        <div
          className={`w-full border border-[#dddddd] absolute top-[53px] hover:bg-[#dddddd] ${
            !dropdownMenu && "hidden"
          }`}
        >
          <ul>
            <li className="py-2 px-2 text-center" onClick={logout}>
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
