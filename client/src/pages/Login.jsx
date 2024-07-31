import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./../../store/slices/authslice";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/login`,
        {
          username: Username,
          password,
        }
      );
      const data = await response.data;

      if (data.success) {
        toast.success("Login successful!", {
          duration: 4000,
          position: "bottom-center",

          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          icon: "👏",
        });
        dispatch(login({ token: data.token, user: data.user }));
        navigate(`/${data.user.accounttype}/profile`);

        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error(error);

      toast.error("Login failed");
    }
  };
  return (
    <div className="mt-8 lg:mt-10 min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-xl px-5 py-6 w-full sm:w-[27vw]">
        <h1 className="text-2xl font-bold text-center mb-4">let's login</h1>
        <form action="" onSubmit={handlelogin}>
          <div className="mb-4">
            <label
              htmlFor="Username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="Username"
              id="Username"
              placeholder="Username"
              className=" shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="Password"
              name="name"
              id="name"
              placeholder="Password"
              className=" shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          {/* for account selection */}
          <a href="" className="text-xs text-gray-600 hover:text-black">
            Forgot Password?
          </a>
          {/* login with account */}
          <div className="flex items-center justify-end mb-4">
            <Link className="text-xs text-black " to="/signin">
              Create account
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md shadow-md text-sm font-medium text-white bg-black"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
