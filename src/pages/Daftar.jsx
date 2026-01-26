import Navbar from "/src/komponen-home/Navbar";
import Formulir from "/src/komponen-home/Formulir";
import Footer from "/src/komponen-home/Footer";
import {
  BuildingOffice2Icon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

const Daftar = () => {
  return (
    <div className="bg-slate-50">
      <Navbar />

      {/* Hero Section - Official Registration Header */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute top-[-20%] right-[-10%] w-240 h-240 bg-emerald-100/50 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-160 h-160 bg-teal-100/50 rounded-full blur-[100px]"></div>
        </div>

        {/* Decorative Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.4] select-none pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#e2e8f0 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Official Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-8 animate-fadeIn">
              <BuildingOffice2Icon className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-black text-emerald-700 uppercase tracking-[0.2em]">
                Pendaftaran Resmi Rusunawa
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6 animate-slideUp">
              Akses Hunian <br />
              <span className="text-emerald-600">Nyaman & Terjangkau.</span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-10 animate-fadeIn delay-200">
              Lengkapi formulir pendaftaran di bawah ini dengan data yang valid
              untuk memulai pengajuan unit hunian di Rumah Susun Sederhana Sewa
              Kabupaten Lombok Timur.
            </p>

            {/* Quick Stats/Badges */}
            <div className="flex flex-wrap justify-center gap-6 animate-fadeIn delay-300">
              <div className="flex items-center gap-3 text-slate-500">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                <span className="text-sm font-bold uppercase tracking-widest">
                  Sistem Verifikasi Digital
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                <span className="text-sm font-bold uppercase tracking-widest">
                  Respon 3-5 Hari Kerja
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Curve/Transition Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Form Section with negative margin to overlap slightly if desired, 
          but as it is, it transitions smoothly because Formulir has a slate-50 background */}
      <div className="relative z-20">
        <Formulir />
      </div>

      <Footer />
    </div>
  );
};

export default Daftar;
