// ==========================
// IMPORT
// ==========================

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { productsApi } from "../api/productsApi";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";

function ProductPage() {
  // ==========================
  // STATE LƯU DỮ LIỆU PRODUCT
  // ==========================

  const [products, setProducts] = useState([]);

  // Danh sách sau khi search/filter/sort
  const [filteredProducts, setFilteredProducts] = useState([]);

  // ==========================
  // STATE SEARCH / FILTER / SORT
  // ==========================

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [sortOption, setSortOption] = useState("none");

  // ==========================
  // STATE CHO EDIT PRODUCT
  // ==========================
  // Nếu null => đang thêm mới
  // Nếu có object => đang sửa sản phẩm

  const [editingProduct, setEditingProduct] = useState(null);

  // ==========================
  // STATE LOADING + ERROR
  // ==========================

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================
  // GET ALL PRODUCTS
  // ==========================

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await productsApi.getAll();

      // API trả:
      // {
      //    items: []
      // }

      const list = data.items || data || [];

      setProducts(list);

      setFilteredProducts(list);
    } catch (err) {
      setError("Load products failed.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // CHẠY 1 LẦN KHI VÀO PAGE
  // ==========================

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==========================
  // SEARCH + FILTER + SORT
  // ==========================

  useEffect(() => {
    let result = [...products];

    // ======================
    // SEARCH THEO NAME
    // ======================

    if (searchTerm.trim() !== "") {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // ======================
    // FILTER CATEGORY
    // ======================

    if (selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // ======================
    // SORT PRICE
    // ======================

    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, sortOption]);

  // ==========================
  // EDIT PRODUCT
  // ==========================
  // Click nút Edit
  // đưa product vào form

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  // ==========================
  // DELETE PRODUCT
  // ==========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");

    // Nếu chọn Cancel
    // không làm gì

    if (!confirmDelete) return;

    try {
      // gọi API DELETE

      await productsApi.delete(id);

      // Load lại danh sách sau khi xóa

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // CATEGORY LIST
  // ==========================

  const categories = [
    "All",
    ...new Set((products || []).map((p) => p.category)),
  ];

  // ==========================
  // LOADING / ERROR
  // ==========================

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>Products</h1>

      {/* ==========================
          PRODUCT FORM

          - Không có editingProduct
            => CREATE

          - Có editingProduct
            => UPDATE
      ========================== */}

      <ProductForm
        onSuccess={fetchProducts}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
      />

      <hr />

      {/* ==========================
          SEARCH FILTER SORT
      ========================== */}

      <div
        style={{
          display: "flex",

          gap: "10px",

          marginBottom: "20px",

          marginTop: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="none">Sort</option>

          <option value="price-asc">Price Low → High</option>

          <option value="price-desc">Price High → Low</option>
        </select>

        <button
          onClick={() => {
            setSearchTerm("");

            setSelectedCategory("All");

            setSortOption("none");
          }}
        >
          Clear
        </button>
      </div>

      <p>
        Showing {filteredProducts.length}/{products.length}
        products
      </p>

      {/* ==========================
          PRODUCT LIST

          truyền Edit/Delete xuống
      ========================== */}

      <ProductList
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default ProductPage;
