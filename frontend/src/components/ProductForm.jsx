import { useEffect, useState } from "react";
import axios from "axios";

import { productsApi } from "../api/productsApi";

// ==========================
// PRODUCT FORM
//
// CREATE PRODUCT
// UPDATE PRODUCT
// UPLOAD IMAGE
// ==========================

function ProductForm({ onSuccess, editingProduct, setEditingProduct }) {
  // ==========================
  // FORM DATA
  // ==========================

  const [formData, setFormData] = useState({
    name: "",

    price: "",

    category: "",

    description: "",

    imageUrl: "",
  });

  // ==========================
  // FILE IMAGE
  // ==========================

  const [image, setImage] = useState(null);

  // ==========================
  // EDIT PRODUCT
  // ==========================

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,

        price: editingProduct.price,

        category: editingProduct.category,

        description: editingProduct.description,

        imageUrl: editingProduct.imageUrl,
      });
    }
  }, [editingProduct]);

  // ==========================
  // HANDLE INPUT
  // ==========================

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // SELECT IMAGE
  // ==========================

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // ==========================
  // SUBMIT
  // CREATE / UPDATE
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.imageUrl;

      // ==========================
      // UPLOAD IMAGE
      // ==========================

      if (image) {
        const uploadData = new FormData();

        uploadData.append(
          "image",

          image
        );

        const response = await axios.post(
          "http://127.0.0.1:8000/upload",

          uploadData
        );

        imageUrl = response.data.imageUrl;
      }

      // ==========================
      // DATA SEND BACKEND
      //
      // ProductCreate:
      //
      // name
      // price
      // category
      // description
      // imageUrl
      //
      // ==========================

      const product = {
        name: formData.name.trim(),

        price: Number(formData.price),

        category: formData.category.trim(),

        description: formData.description.trim(),

        imageUrl: imageUrl || "",
      };

      // ==========================
      // UPDATE
      // ==========================

      if (editingProduct) {
        await productsApi.update(
          editingProduct.id,

          product
        );

        setEditingProduct(null);
      }

      // ==========================
      // CREATE
      // ==========================
      else {
        await productsApi.create(product);
      }

      // reload list

      onSuccess();

      // RESET FORM

      setFormData({
        name: "",

        price: "",

        category: "",

        description: "",

        imageUrl: "",
      });

      setImage(null);
    } catch (error) {
      console.log(JSON.stringify(error.response?.data, null, 2));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",

        flexDirection: "column",

        gap: "12px",

        maxWidth: "400px",

        marginBottom: "30px",
      }}
    >
      <h3>{editingProduct ? "Edit Product" : "Add Product"}</h3>

      <input
        name="name"
        placeholder="Product name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      {/* ==========================
          IMAGE UPLOAD
      ========================== */}

      <input type="file" accept="image/*" onChange={handleImageChange} />

      <button type="submit">
        {editingProduct ? "Update Product" : "Add Product"}
      </button>

      {editingProduct && (
        <button
          type="button"
          onClick={() => {
            setEditingProduct(null);

            setImage(null);

            setFormData({
              name: "",

              price: "",

              category: "",

              description: "",

              imageUrl: "",
            });
          }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default ProductForm;
