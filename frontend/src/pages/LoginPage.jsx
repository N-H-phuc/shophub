import { useState } from "react";
import { authApi } from "../api/authApi";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await authApi.login({
        email,
        password,
      });

      localStorage.setItem("token", res.access_token);
      localStorage.setItem("user", JSON.stringify(res.user));
      if (res.user.role === "admin") {
        window.location.href = "/users";
      } else {
        window.location.href = "/";
      }

      console.log(res);
    } catch (err) {
      console.log(err);
      alert("Email or password is incorrect!");
    }
  };

  return (
    <section style={{ padding: "24px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default LoginPage;
