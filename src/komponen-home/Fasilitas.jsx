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
} from "@heroicons/react/24/outline";

const Fasilitas = () => {
  const fasilitasList = [
    {
      icon: HomeModernIcon,
      title: "Unit Hunian Modern",
      description:
        "Unit hunian dengan desain modern, ventilasi baik, dan pencahayaan alami yang optimal",
      color: "blue",
    },
    {
      icon: BeakerIcon,
      title: "Air Bersih 24 Jam",
      description:
        "Ketersediaan air bersih sepanjang hari untuk kebutuhan sehari-hari penghuni",
      color: "emerald",
    },
    {
      icon: BoltIcon,
      title: "Listrik Terjangkau",
      description:
        "Instalasi listrik yang aman dengan daya sesuai kebutuhan rumah tangga",
      color: "amber",
    },
    {
      icon: TruckIcon,
      title: "Area Parkir Luas",
      description:
        "Area parkir yang luas dan aman untuk kendaraan roda dua dan roda empat",
      color: "indigo",
    },
    {
      icon: SparklesIcon,
      title: "Ruang Terbuka Hijau",
      description:
        "Taman dan ruang terbuka hijau sebagai area bermain dan bersantai",
      color: "teal",
    },
    {
      icon: ShieldCheckIcon,
      title: "Keamanan 24/7",
      description:
        "Sistem keamanan terpadu dengan petugas keamanan yang siaga setiap saat",
      color: "rose",
    },
    {
      icon: MoonIcon,
      title: "Fasilitas Ibadah",
      description:
        "Musholla yang nyaman dan bersih untuk kegiatan keagamaan penghuni",
      color: "purple",
    },
    {
      icon: ShoppingBagIcon,
      title: "Area Komersial",
      description:
        "Ruang usaha strategis untuk kebutuhan ekonomi dan belanja sehari-hari",
      color: "orange",
    },
  ];

  return (
    <section
      id="fasilitas"
      className="relative py-24 lg:py-32 overflow-hidden bg-slate-50/50"
    >
      {/* Background Decor */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/50 border border-emerald-200 mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
              Fasilitas Unggulan
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Kenyamanan Hidup <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500">
              Maksimal Untuk Anda
            </span>
          </h2>
          <p className="text-slate-600 text-lg font-medium leading-relaxed">
            Kami menghadirkan lingkungan hunian yang tidak hanya terjangkau,
            tetapi juga didukung oleh berbagai fasilitas modern untuk menunjang
            produktivitas dan kesejahteraan keluarga.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {fasilitasList.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-[32px] p-8 shadow-sm hover:shadow-2xl hover:shadow-emerald-100 border border-slate-100 hover:border-emerald-200 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-50 transition-all duration-500">
                <item.icon className="w-8 h-8 text-slate-600 group-hover:text-emerald-600 transition-colors" />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Hover Indicator */}
              <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-8 h-1 bg-emerald-400 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Bottom CTA */}
        <div className="mt-24 lg:mt-32">
          <div className="relative group overflow-hidden bg-slate-900 rounded-[40px] p-10 lg:p-16 text-center shadow-2xl">
            {/* Animated Background Gradients */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-700"></div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                Mulai Kehidupan Baru Anda <br />
                <span className="text-emerald-400">Di Rusunawa Lotim</span>
              </h3>
              <p className="text-slate-400 text-lg font-medium">
                Sistem pendaftaran yang mudah dan cepat. Pastikan keluarga Anda
                mendapatkan hunian terbaik dengan harga yang kompetitif.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a
                  href="/daftar"
                  className="inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-emerald-900/40 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Daftar Sekarang
                  <ArrowRightIcon className="w-5 h-5" />
                </a>
                <a
                  href="#kontak"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-bold px-10 py-4 rounded-2xl backdrop-blur-md border border-white/10 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Hubungi Admin
                  <PhoneIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fasilitas;
