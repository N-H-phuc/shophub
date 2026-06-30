import { NavLink } from "react-router-dom";

const Header = ({ title }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Cart", to: "/cart" },
  ];

  const linkStyle = ({ isActive }) => ({
    marginLeft: "15px",
    textDecoration: "none",
    color: isActive ? "#1976d2" : "#555",
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 24px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h1 style={{ margin: 0 }}>{title}</h1>

      <nav>
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} style={linkStyle}>
            {item.label}
          </NavLink>
        ))}

        {/* Chỉ Admin mới thấy menu Users */}
        {user?.role === "admin" && (
          <NavLink to="/users" style={linkStyle}>
            Users
          </NavLink>
        )}

        {!user ? (
          <NavLink to="/login" style={linkStyle}>
            Login
          </NavLink>
        ) : (
          <>
            <span
              style={{
                marginLeft: "20px",
                fontWeight: "bold",
              }}
            >
              Hello, {user.full_name}
            </span>

            <button
              onClick={handleLogout}
              style={{
                marginLeft: "15px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
