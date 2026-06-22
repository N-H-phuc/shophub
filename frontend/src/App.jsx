import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Header title="ShopHub" />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/products" element={<ProductPage />} />

        <Route path="/products/:id" element={<ProductDetailPage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="*"
          element={
            <h2
              style={{
                padding: "30px",
              }}
            >
              Page Not Found
            </h2>
          }
        />
      </Routes>
    </>
  );
}

export default App;
