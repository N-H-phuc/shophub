import { useNavigate } from "react-router-dom";

function UserList({ users = [], onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>User List</h2>

      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <p>ID: {user.id}</p>

          <p>Email: {user.email}</p>

          <p>Name: {user.full_name}</p>

          <p>Role: {user.role}</p>

          <button onClick={() => onEdit(user)}>Edit</button>

          <button
            onClick={() => navigate(`/users/${user.id}`)}
            style={{
              marginLeft: "10px",
            }}
          >
            Detail
          </button>

          <button
            onClick={() => onDelete(user.id)}
            style={{
              marginLeft: "10px",
            }}
          >
            Delete
          </button>
        </div>
      ))}

      {users.length === 0 && <p>No users found</p>}
    </div>
  );
}

export default UserList;
