import Navbar from "/src/komponen-home/Navbar";
import Formulir from "/src/komponen-home/Formulir";
import Footer from "/src/komponen-home/Footer";

const Daftar = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 bg-linear-to-br from-emerald-800 via-emerald-700 to-teal-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 pb-10 relative z-10">
          {/* Government Badge */}
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2">
              <span className="text-white/90 block md:hidden text-sm font-medium tracking-wide">
                🏛️ Dinas PERKIM Kab. LOTIM
              </span>
              <span className="text-white/90 hidden md:block text-sm font-medium tracking-wide">
                🏛️ Dinas Perumahan dan Kawasan Permukiman Kabupaten Lombok Timur
              </span>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Formulir Pendaftaran
              <span className="block text-emerald-200 mt-2">Rusunawa</span>
            </h1>
          </div>
        </div>
      </section>

      <Formulir />

      <Footer />
    </>
  );
};

export default Daftar;
