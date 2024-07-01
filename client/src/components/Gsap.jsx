import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import BuyerDashboard from "../pages/BuyerDashboard";
import SellerDashboard from "../pages/SellerDashboard";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import toast, { Toaster } from "react-hot-toast";
const Gsap = () => {
  const noderef = useRef();
  const location = useLocation();

  useEffect(() => {
    if (noderef.current) {
      gsap.fromTo(noderef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
      //   toast.success("Welcome to the page");
    }
  }, [location]);
  return (
    <div ref={noderef} id="">
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signup />} />
        <Route path="/buyer/profile" element={<BuyerDashboard />} />
        <Route path="/seller/profile" element={<SellerDashboard />} />
      </Routes>
    </div>
  );
};

export default Gsap;
