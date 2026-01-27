import {
  TrophyIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  TruckIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const About = () => {
  const misiList = [
    {
      icon: GlobeAltIcon,
      title: "Infrastruktur Air",
      description:
        "Meningkatkan ketersediaan air bersih dan sanitasi layak untuk seluruh lapisan masyarakat.",
    },
    {
      icon: TruckIcon,
      title: "Konektivitas Wilayah",
      description:
        "Membangun jalan dan jembatan untuk mempermudah akses ekonomi antar wilayah.",
    },
    {
      icon: BuildingOfficeIcon,
      title: "Hunian Layak",
      description:
        "Menyediakan perumahan yang sehat, aman, dan terjangkau bagi penduduk Berpenghasilan Rendah.",
    },
    {
      icon: MapPinIcon,
      title: "Pemerataan Daerah",
      description:
        "Fokus pembangunan dari pinggiran untuk mengurangi kesenjangan antar kawasan.",
    },
    {
      icon: Cog6ToothIcon,
      title: "Tata Kelola Efisien",
      description:
        "Implementasi manajemen yang transparan dan akuntabel dalam setiap program kerja.",
    },
  ];

  return (
    <section
      id="tentang"
      className="relative py-10 lg:py-32 overflow-hidden bg-white"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-emerald-50/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* VISI SECTION */}
        <div className="mb-16 lg:mb-24">
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 lg:p-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
                <TrophyIcon className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                  Visi Utama
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-snug">
                "Terwujudnya Infrastruktur{" "}
                <span className="text-emerald-600">
                  Perumahan dan Permukiman
                </span>{" "}
                yang Handal untuk Indonesia yang Mandiri."
              </h2>
            </div>
          </div>
        </div>

        {/* MISI SECTION */}
        <div className="mb-16 lg:mb-24">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-4">
                <CheckCircleIcon className="w-4 h-4 text-slate-600" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                  Misi Strategis
                </span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-black text-slate-900">
                Fokus Pembangunan Kami
              </h3>
            </div>
            <p className="text-slate-500 font-medium max-w-sm md:text-right">
              Lima pilar utama dalam mewujudkan kawasan permukiman yang
              terintegrasi di Lombok Timur.
            </p>
          </div>

          {/* Misi Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {misiList.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-5 group-hover:bg-emerald-600 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="bg-slate-900 rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl lg:text-3xl font-black text-white mb-4">
                Informasi Kontak
              </h3>
              <p className="text-slate-400 font-medium mb-8 max-w-md">
                Hubungi kami untuk informasi lebih lanjut mengenai program
                bantuan rumah atau pelaporan lingkungan.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                    <MapPinIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-slate-300 font-medium group-hover:text-white transition-colors">
                    Jl. Raya Selong, Lombok Timur, NTB
                  </span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                    <PhoneIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-slate-300 font-medium group-hover:text-white transition-colors">
                    (0376) 123-456 / +62 812-3456-7890
                  </span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                    <EnvelopeIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-slate-300 font-medium group-hover:text-white transition-colors">
                    perkim@lotim.go.id
                  </span>
                </div>
              </div>
            </div>

            {/* Action Card */}
            <div className="bg-slate-800 rounded-2xl p-8 text-center border border-slate-700">
              <div className="w-16 h-16 rounded-full bg-emerald-600/20 flex items-center justify-center mx-auto mb-6">
                <EnvelopeIcon className="w-8 h-8 text-emerald-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                Layanan Informasi
              </h4>
              <p className="text-slate-400 text-sm mb-6">
                Butuh bantuan? Kirim pesan kepada kami.
              </p>
              <button className="w-full px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-emerald-50 transition-colors">
                Kirim Pesan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
