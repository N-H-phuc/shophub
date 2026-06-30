import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("ProtectedRoute");
  console.log("Token =", token);
  console.log("User =", user);

  if (!token || !user) {
    console.log("CASE 1");
    return <Navigate to="/login" replace />;
  }

  console.log("Role =", user.role);

  if (user.role !== "admin") {
    console.log("CASE 2");
    return <Navigate to="/" replace />;
  }

  console.log("CASE 3");

  return children;
}

export default ProtectedRoute;
