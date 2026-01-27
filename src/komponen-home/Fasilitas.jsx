import {
  HomeModernIcon,
  BeakerIcon,
  BoltIcon,
  TruckIcon,
  SparklesIcon,
  ShieldCheckIcon,
  MoonIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
  PhoneIcon,
  WifiIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Fasilitas = () => {
  const fasilitasList = [
    {
      icon: HomeModernIcon,
      title: "Unit Modern",
      description:
        "Desain minimalis dengan optimalisasi ruang dan cahaya alami.",
      color: "emerald",
    },
    {
      icon: BeakerIcon,
      title: "Air Bersih",
      description: "Sistem distribusi air bersih terjamin selama 24 jam penuh.",
      color: "blue",
    },
    {
      icon: BoltIcon,
      title: "Listrik Aman",
      description: "Instalasi sesuai standar kelistrikan nasional yang aman.",
      color: "amber",
    },
    {
      icon: TruckIcon,
      title: "Parkir Luas",
      description: "Area parkir terpadu untuk kendaraan roda 2 dan roda 4.",
      color: "slate",
    },
    {
      icon: SparklesIcon,
      title: "Ruang Hijau",
      description: "Taman asri untuk area bermain dan interaksi sosial.",
      color: "teal",
    },
    {
      icon: ShieldCheckIcon,
      title: "Keamanan 24/7",
      description: "Pengawasan CCTV dan petugas keamanan yang siaga.",
      color: "rose",
    },
    {
      icon: WifiIcon,
      title: "Area Publik Wifi",
      description: "Konektivitas internet di area bersama untuk penghuni.",
      color: "indigo",
    },
    {
      icon: UserGroupIcon,
      title: "Balai Warga",
      description: "Ruang serbaguna untuk kegiatan komunitas penghuni.",
      color: "cyan",
    },
  ];

  return (
    <section
      id="fasilitas"
      className="relative py-24 lg:py-32 overflow-hidden bg-white"
    >
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-10 left-10 w-64 h-64 border-40 border-emerald-500 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 border-60 border-teal-500 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 animate-fadeIn">
              <SparklesIcon className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">
                Ultimate Comfort
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] animate-slideUp">
              Fasilitas Lengkap <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500">
                Tanpa Kompromi.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-slate-500 font-medium text-lg leading-relaxed animate-slideUp delay-100">
            Kami menghadirkan standar hunian baru yang mengutamakan kualitas
            hidup dan kemudahan akses bagi setiap penghuni.
          </p>
        </div>

        {/* Facilities Grid - Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {fasilitasList.map((item, index) => (
            <div
              key={index}
              className="group relative h-full bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative z-10 space-y-6">
                <div
                  className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-emerald-600 group-hover:shadow-lg group-hover:shadow-emerald-200`}
                >
                  <item.icon className="w-7 h-7 text-slate-600 group-hover:text-white transition-colors" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic CTA Card */}
        <div className="mt-24 lg:mt-32">
          <div className="relative group rounded-[48px] overflow-hidden bg-slate-900 p-8 md:p-16 lg:p-20 shadow-2xl">
            {/* Animated Mesh BG */}
            <div className="absolute top-0 right-0 w-[60%] h-full bg-linear-to-l from-emerald-500/20 via-teal-500/10 to-transparent blur-3xl"></div>

            <div className="flex flex-col justify-center items-center">
              <div className="space-y-8 text-center">
                <h3 className="text-3xl lg:text-5xl font-black text-white leading-tight">
                  Wujudkan{" "}
                  <span className="text-emerald-400">Hunian Impian</span> <br />
                  Bersama Kami.
                </h3>
                <p className="text-slate-400 text-lg font-medium max-w-lg leading-relaxed">
                  Hunian strategis dengan pengelolaan profesional untuk
                  kenyamanan keluarga Anda di Lombok Timur.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/daftar"
                    className="inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-10 py-5 rounded-3xl shadow-xl shadow-emerald-900/40 hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    Daftar Sekarang
                    <ArrowRightIcon className="w-6 h-6" />
                  </a>
                  <a
                    href="#kontak"
                    className="inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white font-bold px-10 py-5 rounded-3xl backdrop-blur-md border border-white/10 transition-all duration-300"
                  >
                    Hubungi Kami
                    <PhoneIcon className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fasilitas;
