import { Link } from "react-router-dom";

const ProductCard = ({ id, name, price, category, imageUrl, description }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        width: "220px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        src={imageUrl}
        alt={name}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "contain",
        }}
      />

      <h3>{name}</h3>

      <p>{category}</p>

      <p>
        <strong>${price}</strong>
      </p>

      <p
        style={{
          fontSize: "14px",
          color: "#666",
        }}
      >
        {description.slice(0, 50)}...
      </p>

      <Link
        to={`/products/${id}`}
        style={{
          marginTop: "auto",
          textDecoration: "none",
          background: "#1976d2",
          color: "white",
          padding: "8px",
          textAlign: "center",
          borderRadius: "4px",
        }}
      >
        View Detail
      </Link>
    </div>
  );
};

export default ProductCard;
