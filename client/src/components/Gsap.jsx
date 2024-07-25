import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import BuyerDashboard from "../pages/BuyerDashboard";
import SellerDashboard from "../pages/SellerDashboard";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import toast, { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./ProtectedRoutes";

const Gsap = () => {
  const noderef = useRef();
  const location = useLocation();

  useEffect(() => {
    if (noderef.current) {
      gsap.fromTo(noderef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
    }
  }, [location]);

  return (
    <div ref={noderef}>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <ProtectedRoutes requiredauth={false}>
              <Login />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/signin"
          element={
            <ProtectedRoutes requiredauth={false}>
              <Signup />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/buyer/profile"
          element={
            <ProtectedRoutes>
              <BuyerDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/seller/profile"
          element={
            <ProtectedRoutes>
              <SellerDashboard />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
};

export default Gsap;
