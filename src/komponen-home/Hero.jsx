import {
  MapPinIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const Hero = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content - spans 7 columns */}
          <div className="lg:col-span-7 space-y-10 z-10">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-slate-900 leading-[1.05] tracking-tight animate-slideUp">
                Hunian Masa <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-size-[200%_auto] animate-gradient-x">
                  Depan Keluarga.
                </span>
              </h1>
              <p className="max-w-xl text-lg md:text-xl text-slate-600 font-medium leading-relaxed animate-slideUp delay-100">
                Wujudkan impian memiliki hunian yang aman, nyaman, dan
                terjangkau di Kabupaten Lombok Timur. Fasilitas modern dengan
                ekosistem lingkungan yang asri.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 pt-4 animate-slideUp delay-200">
              <a
                href="/daftar"
                className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white bg-slate-900 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] active:scale-95"
              >
                <div className="absolute inset-0 w-0 bg-emerald-600 transition-all duration-500 ease-out group-hover:w-full"></div>
                <span className="relative flex items-center gap-3">
                  Daftar Sekarang
                  <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <a
                href="#fasilitas"
                className="inline-flex items-center justify-center px-10 py-5 font-bold text-slate-700 bg-white border-2 border-slate-100 rounded-2xl hover:bg-slate-50 hover:border-emerald-200 hover:text-emerald-700 transition-all duration-300 shadow-sm"
              >
                Lihat Fasilitas
              </a>
            </div>

            {/* Premium Trust Indicators */}
            <div className="flex items-center gap-10 pt-10 border-t border-slate-100 animate-fadeIn delay-300">
              <div className="space-y-1">
                <p className="text-3xl font-black text-slate-900">120+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Unit Tersedia
                </p>
              </div>
              <div className="w-px h-12 bg-slate-100"></div>
              <div className="space-y-1">
                <p className="text-3xl font-black text-slate-900">24/7</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Keamanan & CCTV
                </p>
              </div>
              <div className="w-px h-12 bg-slate-100"></div>
              <div className="space-y-1">
                <p className="text-3xl font-black text-slate-900">1.2k</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Total Penghuni
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Modern Product Showcase - spans 5 columns */}
          <div className="lg:col-span-5 relative lg:h-[700px] flex items-center justify-center animate-scaleIn delay-200">
            {/* Decorative Orbit Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[120%] aspect-square border border-emerald-100/50 rounded-full animate-spin-slow opacity-20"></div>
              <div className="w-[140%] aspect-square border border-teal-100/50 rounded-full animate-reverse-spin opacity-10"></div>
            </div>

            <div className="relative w-full max-w-md aspect-4/5 group">
              {/* Main Visual Frame */}
              <div className="absolute inset-0 bg-slate-900 rounded-[48px] rotate-3 group-hover:rotate-0 transition-transform duration-700 shadow-2xl"></div>

              <div className="absolute inset-0 overflow-hidden rounded-[48px] bg-white border-8 border-white shadow-2xl transition-all duration-700 group-hover:-translate-y-4 group-hover:-translate-x-2">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000"
                  alt="Modern Housing"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-transparent to-transparent"></div>

                {/* Location Overlay */}
                <div className="absolute bottom-8 left-8 right-8 z-10 flex items-end justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <MapPinIcon className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">
                        Selong, Lotim
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      Rusunawa <br /> Labuhan Haji
                    </h3>
                  </div>
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
                    <SparklesIcon className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Float Cards */}
              <div className="absolute -top-4 -right-8 md:-top-10 md:-right-12 bg-white/90 backdrop-blur-xl p-6 rounded-[32px] shadow-2xl border border-white/20 max-w-[200px] animate-float">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-200">
                    <ShieldCheckIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                      Security
                    </p>
                    <p className="text-sm font-bold text-slate-800 uppercase">
                      Verified
                    </p>
                  </div>
                </div>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">
                  Lingkungan terpantau sistem keamanan terpadu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Adding custom keyframes dynamically for this component */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-reverse-spin {
          animation: reverse-spin 25s linear infinite;
        }
      `,
        }}
      />
    </section>
  );
};

export default Hero;
