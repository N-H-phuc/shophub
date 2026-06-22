import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);

        setProduct(res.data);
      } catch {
        setError("Cannot load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <section style={{ padding: "24px" }}>
      <Link to="/products">← Back to Products</Link>

      <h2>{product.title}</h2>

      <img src={product.image} width="250" />

      <p>{product.category}</p>

      <h3>${product.price}</h3>

      <p>{product.description}</p>

      <button>Add To Cart</button>
    </section>
  );
}

export default ProductDetailPage;
