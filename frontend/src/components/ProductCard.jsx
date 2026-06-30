import { Link } from "react-router-dom";

// ==========================
// PRODUCT CARD
// Nhận:
// id, name, price...
// onEdit: sửa
// onDelete: xóa
// ==========================

const ProductCard = ({
  id,
  name,
  price,
  category,
  imageUrl,
  description,

  onEdit,
  onDelete,
}) => {
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
      {/* ==========================
          PRODUCT IMAGE
      ========================== */}

      <img
        src={`http://127.0.0.1:8000${imageUrl}`}
        alt={name}
        style={{
          width: "100%",

          height: "150px",

          objectFit: "contain",
        }}
      />

      {/* ==========================
          PRODUCT INFO
      ========================== */}

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
        {description?.slice(0, 50)}...
      </p>

      {/* ==========================
          VIEW DETAIL
      ========================== */}

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

          marginBottom: "8px",
        }}
      >
        View Detail
      </Link>

      {/* ==========================
          EDIT BUTTON

          Gọi:
          ProductCard
             ↓
          ProductList
             ↓
          ProductPage
             ↓
          ProductForm

      ========================== */}

      <button
        onClick={onEdit}
        style={{
          padding: "8px",

          marginBottom: "8px",

          cursor: "pointer",
        }}
      >
        Edit
      </button>

      {/* ==========================
          DELETE BUTTON

          Gọi API DELETE
      ========================== */}

      <button
        onClick={onDelete}
        style={{
          padding: "8px",

          cursor: "pointer",

          background: "#d32f2f",

          color: "white",

          border: "none",

          borderRadius: "4px",
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default ProductCard;
