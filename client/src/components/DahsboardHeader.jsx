import { useSelector, useDispatch } from "react-redux";
import { RiMenu2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { togglesidebar } from "../../store/slices/navslice";

const DahsboardHeader = () => {
  const user = useSelector((state) => state.auth.user.username);
  const type = useSelector((state) => state.auth.accounttype);
  const sidebar = useSelector((state) => state.nav.sidebar);

  const dispatch = useDispatch();

  return (
    <>
      <div className="my-5 mx-8">
        <h1 className="text-3xl font-bold">
          hello{user.charAt(0).toUpperCase() + user.slice(1)},
        </h1>
        <p className="">welcome to your {type} Dashboard</p>
      </div>
      {/* hamburgeuricon  */}
      <RiMenu2Fill
        onClick={() => dispatch(togglesidebar())}
        className={`${
          sidebar === true ? "hidden" : "block sm:hidden"
        } text-3xl absolute top-8 right-5 cursor-pointer`}
      />
      <IoClose
        onClick={() => dispatch(togglesidebar())}
        className={`${
          sidebar === true ? "block sm:hidden" : "hidden"
        } text-3xl absolute top-8 right-5 cursor-pointer`}
      />
    </>
  );
};

export default DahsboardHeader;
