import { useEffect, useState } from "react";

const UserDetail = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userId) return;

    fetch(`https://fakestoreapi.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, [userId]);

  if (!userId) {
    return <h2>Select a user</h2>;
  }

  if (!user) {
    return <h2>Loading user...</h2>;
  }

  return (
    <div
      style={{
        margin: "20px",
        padding: "20px",
        border: "1px solid #ddd",
      }}
    >
      <h2>User Detail</h2>

      <p>
        <strong>Username:</strong> {user.username}
      </p>

      <p>
        <strong>Name:</strong> {user.name.firstname} {user.name.lastname}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
    </div>
  );
};

export default UserDetail;
