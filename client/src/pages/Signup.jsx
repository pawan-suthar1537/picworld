import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("buyer");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/signin`,
        {
          username,
          email,
          password,
          accounttype: accountType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;

      if (data.success) {
        toast.success("Signup successful!", {
          duration: 4000,
          position: "bottom-center",

          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          icon: "👏",
        });
        setUsername("");
        setEmail("");
        setPassword("");
        setAccountType("");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);

      toast("Signup failed: " + error.response.data.message);
    }
  };

  return (
    <div className="mt-20 sm:mt-10 min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-xl px-5 py-6 w-full sm:w-[27vw]">
        <h1 className="text-2xl font-bold text-center mb-4">let's Connect</h1>
        <form action="" onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="name"
              id="name"
              placeholder="username"
              className=" shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="your@email.com"
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
          <div className="mb-4">
            <label
              htmlFor="Account Type"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Account Type
            </label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className=" shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
              name=""
              id=""
            >
              <option value="">Select Account Type</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          {/* login with account */}
          <div className="flex items-center justify-end mb-4">
            <Link className="text-xs text-black " to="/login">
              Login with account
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md shadow-md text-sm font-medium text-white bg-black"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
