// ==========================
// IMPORT
// ==========================

import ProductCard from "./ProductCard";

// ==========================
// PRODUCT LIST
// Nhận:
// - products: danh sách sản phẩm
// - onEdit: sửa sản phẩm
// - onDelete: xóa sản phẩm
// ==========================

const ProductList = ({ products, onEdit, onDelete }) => {
  // ==========================
  // Không có sản phẩm
  // ==========================

  if (products.length === 0) {
    return <h3>No products found</h3>;
  }

  return (
    <section
      style={{
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",

          flexWrap: "wrap",

          gap: "20px",
        }}
      >
        {products.map((product) => (
          <ProductCard
            // ==================
            // KEY REACT
            // ==================

            key={product.id}
            // ==================
            // DATA PRODUCT
            // ==================

            id={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
            imageUrl={product.imageUrl}
            description={product.description}
            // ==================
            // EDIT
            // Khi bấm Edit
            // gửi product lên ProductPage
            // ==================

            onEdit={() => onEdit(product)}
            // ==================
            // DELETE
            // Khi bấm Delete
            // gửi id lên ProductPage
            // ==================

            onDelete={() => onDelete(product.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
