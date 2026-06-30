import { useEffect, useState } from "react";
import { usersApi } from "../api/usersApi";

function UserForm({ onSuccess, editingUser, setEditingUser }) {
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    password: "",
    role: "customer",
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        email: editingUser.email,
        full_name: editingUser.full_name,
        password: "",
        role: editingUser.role,
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUser) {
        await usersApi.update(editingUser.id, {
          email: formData.email,
          full_name: formData.full_name,
          password: formData.password,
          role: formData.role,
        });

        setEditingUser(null);
      } else {
        await usersApi.create({
          email: formData.email,
          full_name: formData.full_name,
          password: formData.password,
        });
      }

      onSuccess();

      setFormData({
        email: "",
        full_name: "",
        password: "",
        role: "customer",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "300px",
      }}
    >
      <h3>{editingUser ? "Edit User" : "Add User"}</h3>

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        name="full_name"
        placeholder="Full name"
        value={formData.full_name}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="customer">Customer</option>

        <option value="admin">Admin</option>
      </select>

      <button>{editingUser ? "Update" : "Add"}</button>

      {editingUser && (
        <button type="button" onClick={() => setEditingUser(null)}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default UserForm;
