import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { usersApi } from "../api/usersApi";

function UserDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const loadUser = async () => {
    try {
      const data = await usersApi.getById(id);

      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>User Detail</h1>

      <p>ID: {user.id}</p>

      <p>Email: {user.email}</p>

      <p>Name: {user.full_name}</p>

      <p>Role: {user.role}</p>

      <button onClick={() => navigate("/users")}>Back</button>
    </div>
  );
}

export default UserDetail;
