import {
  HomeIcon,
  MapPinIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Mesh Background - Fixed for v4 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-100/50 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-100/50 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="relative z-10 space-y-8 animate-fadeIn">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100">
              <SparklesIcon className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-bold text-emerald-700 tracking-wide uppercase">
                Pendaftaran Rusunawa 2026
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Hunian Modern <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500">
                  Untuk Keluarga
                </span>
              </h1>
              <p className="max-w-xl text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
                Wujudkan impian memiliki hunian yang aman, nyaman, dan
                terjangkau di Kabupaten Lombok Timur. Fasilitas lengkap dengan
                lingkungan yang asri.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="/daftar"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-slate-900 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-200 active:scale-95"
              >
                <div className="absolute inset-0 w-3 bg-emerald-500 transition-all duration-400 ease-out group-hover:w-full"></div>
                <span className="relative flex items-center gap-2">
                  Daftar Sekarang
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <a
                href="#fasilitas"
                className="inline-flex items-center justify-center px-8 py-4 font-bold text-slate-700 bg-white border-2 border-slate-100 rounded-2xl hover:bg-slate-50 hover:border-slate-200 transition-all duration-300"
              >
                Lihat Fasilitas
              </a>
            </div>

            {/* Micro Stats */}
            <div className="flex items-center gap-8 pt-6 border-t border-slate-100">
              <div>
                <p className="text-2xl font-black text-slate-900">100+</p>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Unit Tersedia
                </p>
              </div>
              <div className="w-px h-10 bg-slate-100"></div>
              <div>
                <p className="text-2xl font-black text-slate-900">24/7</p>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Keamanan
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Visual */}
          <div className="relative lg:h-[600px] flex items-center justify-center group">
            {/* Background Geometric Shape */}
            <div className="absolute inset-0 bg-emerald-500/5 rounded-[40px] rotate-3 scale-95 transition-transform group-hover:rotate-0 duration-700"></div>

            {/* Layered Cards / Floating Elements */}
            <div className="relative w-full max-w-lg aspect-square">
              {/* Main Card */}
              <div className="absolute inset-0 bg-linear-to-br from-white to-slate-50 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white p-8 flex flex-col justify-end overflow-hidden group-hover:-translate-y-4 transition-transform duration-500">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://picsum.photos/1000/1000')] bg-cover bg-center opacity-90 group-hover:scale-110 transition-transform duration-1000"></div>
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="relative z-10 space-y-2 text-right self-end">
                  <div className="flex items-center justify-end gap-2 text-white/90">
                    <span className="text-sm font-medium">
                      Selong, Lombok Timur
                    </span>
                    <MapPinIcon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Rusunawa Labuhan Haji
                  </h3>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 bg-white p-4 md:p-6 rounded-[24px] shadow-2xl border border-emerald-50 max-w-[180px] animate-bounce-slow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                    <ShieldCheckIcon className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Keamanan
                  </p>
                </div>
                <p className="text-sm font-bold text-slate-800">
                  Sistem Keamanan Terpadu 24 Jam
                </p>
              </div>

              {/* Floating Badge 2 */}
              <div
                className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-white p-4 md:p-6 rounded-[24px] shadow-2xl border border-blue-50 max-w-[180px] animate-bounce-slow"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <HomeIcon className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Fasilitas
                  </p>
                </div>
                <p className="text-sm font-bold text-slate-800">
                  Lingkungan Bersih & Area Terbuka Hijau
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for Bounce Slow */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `,
        }}
      />
    </section>
  );
};

export default Hero;
