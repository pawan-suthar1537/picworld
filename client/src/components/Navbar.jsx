import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const isauth = useSelector((state) => state.auth.isauth);
  const user = useSelector((state) => state.auth.user);
  const role = user ? user.accounttype : null;
  const { pathname } = useLocation();
  return (
    <nav
      className={`flex bg-white flex-col sm:flex-row justify-between items-start sm:items-center px-5 py-5 ${
        pathname.toLowerCase() === "/seller/profile" ||
        pathname.toLowerCase() === "/buyer/profile"
          ? "hidden"
          : "fixed"
      } top-0 right-0 left-0 shadow-md gap-1 sm:gap-0 z-30`}
    >
      <div className="flex justify-between items-center">
        {/* logo */}
        <Link to={"/"} className="font-bold text-3xl">
          Picworld
        </Link>
      </div>
      <ul className="flex gap-5 text-lg font-semibold text-gray-400 ml-5 lg:ml-0">
        <Link to="/about" className="hover:text-black cursor-pointer">
          About
        </Link>
        <Link to="/contact" className="hover:text-black cursor-pointer">
          Contact
        </Link>
        {!isauth ? (
          <>
            <Link to="/login" className="hover:text-black cursor-pointer">
              Log In
            </Link>
            <Link to="/signin" className="hover:text-black cursor-pointer">
              Sign In
            </Link>
          </>
        ) : (
          <Link
            to={`/${role}/profile`}
            className="hover:text-black cursor-pointer"
          >
            Profile
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
