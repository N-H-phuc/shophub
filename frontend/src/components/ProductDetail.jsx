import { useEffect, useState } from "react";

const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [productId]);

  if (!productId) {
    return <h2>Select a product</h2>;
  }

  if (loading) {
    return <h2>Loading detail...</h2>;
  }

  return (
    <div
      style={{
        margin: "30px",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        display: "flex",
        gap: "30px",
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "250px",
          height: "250px",
          objectFit: "contain",
        }}
      />

      <div>
        <h2>{product.title}</h2>

        <p>
          <strong>Category:</strong> {product.category}
        </p>

        <p>
          <strong>Price:</strong> ${product.price}
        </p>

        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
