import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children, requiredauth = true }) => {
  const user = useSelector((state) => state.auth.user);
  const isauth = useSelector((state) => state.auth.isauth);
  const role = user ? user.accounttype : null;
  const location = useLocation();

  if (
    isauth &&
    (location.pathname === "/login" || location.pathname === "/signin")
  ) {
    return <Navigate to={`/${role}/profile`} />;
  }

  if (!isauth && requiredauth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;
