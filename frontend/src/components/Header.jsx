import { NavLink } from "react-router-dom";

const Header = ({ title }) => {
  const navItems = [
    { label: "Home", to: "/" },

    { label: "Products", to: "/products" },

    { label: "Cart", to: "/cart" },

    { label: "Login", to: "/login" },
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
      </nav>
    </header>
  );
};

export default Header;
