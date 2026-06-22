function LoginPage() {
  return (
    <section style={{ padding: "24px" }}>
      <h2>Login</h2>

      <form>
        <input type="text" placeholder="Email" />

        <br />
        <br />

        <input type="password" placeholder="Password" />

        <br />
        <br />

        <button>Login</button>
      </form>
    </section>
  );
}

export default LoginPage;
