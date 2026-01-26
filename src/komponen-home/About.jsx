import {
  TrophyIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  TruckIcon,
  AcademicCapIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const About = () => {
  const misiList = [
    {
      icon: GlobeAltIcon,
      title: "Infrastruktur Air",
      description:
        "Meningkatkan ketersediaan air bersih dan sanitasi layak untuk seluruh lapisan masyarakat.",
      color: "blue",
    },
    {
      icon: TruckIcon,
      title: "Konektivitas Wilayah",
      description:
        "Membangun jalan dan jembatan untuk mempermudah akses ekonomi antar wilayah.",
      color: "emerald",
    },
    {
      icon: BuildingOfficeIcon,
      title: "Hunian Layak",
      description:
        "Menyediakan perumahan yang sehat, aman, dan terjangkau bagi penduduk Berpenghasilan Rendah.",
      color: "teal",
    },
    {
      icon: MapPinIcon,
      title: "Pemerataan Daerah",
      description:
        "Fokus pembangunan dari pinggiran untuk mengurangi kesenjangan antar kawasan.",
      color: "cyan",
    },
    {
      icon: Cog6ToothIcon,
      title: "Tata Kelola Efisien",
      description:
        "Implementasi manajemen yang transparan dan akuntabel dalam setiap program kerja.",
      color: "slate",
    },
  ];

  return (
    <section
      id="tentang"
      className="relative py-24 lg:py-32 overflow-hidden bg-white"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full -z-10 opacity-30 select-none pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-100 rounded-full blur-[120px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8">
        {/* VISI SECTION - Premium Card */}
        <div className="relative mb-24 lg:mb-32 group">
          <div className="absolute -inset-1 bg-linear-to-r from-emerald-600 to-teal-500 rounded-[40px] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative bg-white border border-slate-100 rounded-[40px] p-10 lg:p-20 shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <TrophyIcon className="w-64 h-64 text-slate-900" />
            </div>

            <div className="relative z-10 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-8">
                <TrophyIcon className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-700 tracking-[0.2em] uppercase">
                  Visi Utama
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.2] tracking-tight text-balance">
                "Terwujudnya Infrastruktur{" "}
                <span className="text-emerald-600">
                  Perumahan dan Permukiman
                </span>{" "}
                yang Handal untuk Indonesia yang Mandiri."
              </h2>
            </div>
          </div>
        </div>

        {/* MISI SECTION - Mosaic Grid */}
        <div className="mb-24 lg:mb-32">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-4">
                <CheckCircleIcon className="w-5 h-5 text-slate-600" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                  Misi Strategis
                </span>
              </div>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">
                Fokus Pembangunan Kami
              </h3>
            </div>
            <p className="text-slate-500 font-medium lg:text-right max-w-sm">
              Lima pilar utama dalam mewujudkan kawasan permukiman yang
              terintegrasi di Lombok Timur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {misiList.map((item, index) => (
              <div
                key={index}
                className="group p-8 rounded-[32px] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-500 hover:-translate-y-2"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                >
                  <item.icon
                    className={`w-7 h-7 text-slate-600 group-hover:text-emerald-600 transition-colors`}
                  />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h4>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT SECTION - High End Card */}
        <div className="relative">
          <div className="bg-slate-900 rounded-[48px] p-8 lg:p-16 overflow-hidden shadow-2xl">
            {/* Mesh Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-6">
                  Informasi Kontak
                </h3>
                <p className="text-slate-400 text-lg font-medium mb-10 max-w-md">
                  Hubungi kami untuk informasi lebih lanjut mengenai program
                  bantuan rumah atau pelaporan lingkungan.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-white group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">
                      <MapPinIcon className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-slate-300 group-hover:text-white transition-colors">
                      Jl. Raya Selong, Lombok Timur, NTB
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-white group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">
                      <PhoneIcon className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-slate-300 group-hover:text-white transition-colors">
                      (0376) 123-456 / +62 812-3456-7890
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-white group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">
                      <EnvelopeIcon className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-slate-300 group-hover:text-white transition-colors">
                      perkim@lotim.go.id
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-[40px] rotate-3 scale-95 shadow-2xl"></div>
                  <div className="relative h-full bg-slate-800 rounded-[40px] border border-white/10 p-8 flex flex-col justify-center items-center text-center space-y-6">
                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center">
                      <AcademicCapIcon className="w-12 h-12 text-emerald-400" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-white">
                        Layanan Informasi
                      </h4>
                    </div>
                    <button className="px-8 py-3 bg-white text-slate-900 font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all">
                      Kirim Pesan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
