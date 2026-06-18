import { useEffect, useState } from "react";

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Cannot load users");
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading users...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <section style={{ padding: "20px" }}>
      <h2>User List</h2>

      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #ddd",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h3>{user.username}</h3>

          <p>
            {user.name.firstname} {user.name.lastname}
          </p>

          <p>{user.email}</p>

          <button onClick={() => onSelectUser(user.id)}>View User</button>
        </div>
      ))}
    </section>
  );
};

export default UserList;
