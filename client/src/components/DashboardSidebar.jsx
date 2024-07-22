import { useDispatch, useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { settab } from "../../store/slices/navslice";
import { logout } from "../../store/slices/authslice";
import toast from "react-hot-toast";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.nav.sidebar);
  const tab = useSelector((state) => state.nav.tab);
  console.log(pathname);
  const user = useSelector((state) => state.auth.user.username);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successful", {
      duration: 4000,
      position: "bottom-center",
    });

    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("accounttype");
    localStorage.removeItem("user");
  };
  return (
    <nav
      className={`${
        !sidebar == true
          ? "-translate-x-[500px] sm:translate-x-0"
          : "translate-x-0"
      } fixed z-10 flex text-lg font-semibold bg-white shadow-lg flex-col gap-2 w-fit min-h-screen p-3  list-none justify-between items-center`}
    >
      <div>
        <div className="bg-black my-5 w-fit rounded-full px-6 py-4 text-white ">
          {user.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col gap-2">
          {pathname === "/Seller/profile" ? (
            <li
              className={`w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300  hover:scale-105 flex gap-2 justify-start items-center ${
                tab === "Photo-management" && "bg-black text-white"
              }`}
              onClick={() => dispatch(settab("Photo-management"))}
            >
              <IoMdPhotos /> Photo management
            </li>
          ) : (
            <li className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300  hover:scale-105 flex gap-2 justify-start items-center">
              <IoMdPhotos /> Photos purchase
            </li>
          )}
          <li
            className={`w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300  hover:scale-105 flex gap-2 justify-start items-center ${
              tab === "Analytics" && "bg-black text-white"
            }`}
            onClick={() => dispatch(settab("Analytics"))}
          >
            Analytics
          </li>
          <li className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300  hover:scale-105 flex gap-2 justify-start items-center">
            Orders
          </li>
          <li className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300  hover:scale-105 flex gap-2 justify-start items-center">
            Favorites
          </li>
          <Link
            to={"/"}
            className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300  hover:scale-105 flex gap-2 justify-start items-center"
          >
            Home
          </Link>
        </div>
      </div>
      {/* button */}
      <li
        className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300  hover:scale-105 flex gap-2 justify-start items-center"
        onClick={handleLogout}
      >
        <IoLogOut /> Logout
      </li>
    </nav>
  );
};

export default DashboardSidebar;
