import Navbar from "/src/komponen-home/Navbar";
import Hero from "/src/komponen-home/hero";
import Fasilitas from "/src/komponen-home/Fasilitas";
import Caradaftar from "/src/komponen-home/Caradaftar";
import About from "/src/komponen-home/About";
import Laporan from "/src/komponen-home/Laporan";
import Footer from "/src/komponen-home/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Fasilitas />
      <Caradaftar />
      <About />
      <Laporan />
      <Footer />
    </div>
  );
};

export default Home;
