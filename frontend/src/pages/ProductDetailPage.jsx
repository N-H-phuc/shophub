// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { productsApi } from "../api/productsApi";

// function ProductDetailPage() {
//   const { id } = useParams();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const data = await productsApi.getById(id);

//         setProduct({
//           id: data.id,
//           name: data.name,
//           price: data.price,
//           category: data.category,
//           description: data.description,
//           imageUrl: `http://127.0.0.1:8000${data.imageUrl}`,
//         });
//       } catch (err) {
//         setError("Could not load product details from API.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) {
//     return <h2>Loading product...</h2>;
//   }

//   if (error) {
//     return <h2>{error}</h2>;
//   }

//   if (!product) {
//     return <h2>Product not found</h2>;
//   }

//   return (
//     <section style={{ padding: "24px" }}>
//       <Link to="/products">← Back to Products</Link>

//       <div
//         style={{
//           display: "flex",
//           gap: "24px",
//           marginTop: "20px",
//         }}
//       >
//         <img src={product.imageUrl} alt={product.name} width="250" />

//         <div>
//           <h2>{product.name}</h2>

//           <p>{product.category}</p>

//           <h3>${product.price}</h3>

//           <p>{product.description}</p>

//           <button>Add To Cart</button>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ProductDetailPage;

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productsApi } from "../api/productsApi";

function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await productsApi.getById(id);

        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Could not load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2>Loading product...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <section
      style={{
        padding: "24px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <Link
        to="/products"
        style={{
          textDecoration: "none",
          color: "#1976d2",
        }}
      >
        ← Back to Products
      </Link>

      <div
        style={{
          display: "flex",
          gap: "30px",
          marginTop: "24px",
          alignItems: "flex-start",
        }}
      >
        <img
          src={`http://127.0.0.1:8000${product.imageUrl}`}
          alt={product.name}
          style={{
            width: "300px",
            height: "300px",
            objectFit: "contain",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "12px",
          }}
        />

        <div>
          <h2>{product.name}</h2>

          <p>
            <strong>Category:</strong> {product.category}
          </p>

          <h3>${product.price}</h3>

          <p>{product.description}</p>

          <button
            style={{
              padding: "10px 20px",
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;
