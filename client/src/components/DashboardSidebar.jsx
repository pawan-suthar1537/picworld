import { useDispatch, useSelector } from "react-redux";
import { IoHomeOutline, IoLogOut } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { settab } from "../../store/slices/navslice";
import { login, logout } from "../../store/slices/authslice";
import toast from "react-hot-toast";
import axios from "axios";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { BiCart } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.nav.sidebar);
  const tab = useSelector((state) => state.nav.tab);
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

  const switchprofile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/switchprofile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = res.data;
      toast.success(`Profile Switched to ${data.user.accounttype} `, {
        duration: 1000,
        icon: "👤",
        position: "bottom-center",
      });
      dispatch(login({ token: data.token, user: data.user }));
      navigate(`/${data.user.accounttype}/profile`);
    } catch (error) {
      toast.error(
        `Profile Switch Failed: ${error.response?.data.msg || error.message}`,
        {
          duration: 4000,
          position: "bottom-center",
        }
      );
      console.error("Error switching profile:", error);
    }
  };

  // Normalize pathname to lowercase for consistent comparison
  const normalizedPathname = pathname.toLowerCase();
  const isSellerProfile = normalizedPathname === "/seller/profile";
  const isBuyerProfile = normalizedPathname === "/buyer/profile";

  return (
    <nav
      className={`${
        !sidebar ? "-translate-x-[500px] sm:translate-x-0" : "translate-x-0"
      } fixed z-10 ease-in-out duration-300 flex sm:static text-lg font-semibold bg-white shadow-lg flex-col gap-2 w-fit min-h-screen p-3 list-none justify-between items-center`}
    >
      <div>
        <div className="bg-black my-5 w-fit rounded-full px-6 py-4 text-white">
          {user.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col gap-2">
          {isSellerProfile ? (
            <li
              className={`w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${
                tab === "Photo-management" ? "bg-black text-white" : ""
              }`}
              onClick={() => dispatch(settab("Photo-management"))}
            >
              <IoMdPhotos /> Photo management
            </li>
          ) : (
            <li
              className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center whitespace-nowrap"
              onClick={() => dispatch(settab("Photos-purchase"))}
            >
              <IoMdPhotos /> Photos purchase
            </li>
          )}
          <li
            className={`w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${
              tab === "Analytics" ? "bg-black text-white" : ""
            }`}
            onClick={() => dispatch(settab("Analytics"))}
          >
            <TbBrandGoogleAnalytics />
            Analytics
          </li>
          <li
            className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center"
            onClick={() => dispatch(settab("Orders"))}
          >
            <BiCart />
            Orders
          </li>
          <li
            className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center"
            onClick={() => dispatch(settab("Favorites"))}
          >
            <MdFavoriteBorder />
            Favorites
          </li>
          <Link
            to={"/"}
            className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center"
            onClick={() => dispatch(settab("Home"))}
          >
            <IoHomeOutline />
            Home
          </Link>
          <button
            className="w-full px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 border border-b-2 border-black text-center uppercase text-sm justify-start items-center"
            onClick={switchprofile}
          >
            Switch to {isSellerProfile ? "buyer" : "seller"}
          </button>
        </div>
      </div>
      {/* button */}
      <li
        className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center"
        onClick={handleLogout}
      >
        <IoLogOut /> Logout
      </li>
    </nav>
  );
};

export default DashboardSidebar;
