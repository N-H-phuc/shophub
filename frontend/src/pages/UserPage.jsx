import { useEffect, useState } from "react";

import { usersApi } from "../api/usersApi";

import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

function UserPage() {
  const [users, setUsers] = useState([]);

  const [editingUser, setEditingUser] = useState(null);

  // LOAD USERS
  const loadUsers = async () => {
    try {
      const data = await usersApi.getAll();

      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  // chạy khi vào trang
  useEffect(() => {
    loadUsers();
  }, []);

  // DELETE USER
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa user này?");

    if (!confirmDelete) return;

    try {
      await usersApi.remove(id);

      // load lại danh sách
      loadUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      <UserForm
        onSuccess={loadUsers}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
      />

      <hr />

      <UserList users={users} onEdit={setEditingUser} onDelete={handleDelete} />
    </div>
  );
}

export default UserPage;
