import Banner from "../components/Banner";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <Banner subtitle="Welcome to our store" buttonText="Shop Now" />

      <section style={{ padding: "24px" }}>
        <h2>Welcome to ShopHub</h2>

        <p>Browse products, manage your cart, and explore our store.</p>
      </section>

      <Footer
        studentName="Nguyen Hoang Phuc"
        courseName="Full-Stack Web Development"
      />
    </>
  );
}

export default HomePage;
