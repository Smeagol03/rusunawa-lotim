const About = () => {
  const misiList = [
    {
      icon: "💧",
      title: "Infrastruktur Sumber Daya Air",
      description:
        "Mempercepat pembangunan infrastruktur sumber daya air termasuk sumber daya maritim untuk mendukung kedaulatan pangan, ketahanan air, dan ketahanan energi, guna menggerakkan sektor-sektor strategis ekonomi domestik dalam rangka kemandirian ekonomi.",
    },
    {
      icon: "🛣️",
      title: "Infrastruktur Jalan & Konektivitas",
      description:
        "Mempercepat pembangunan infrastruktur jalan untuk mendukung konektivitas guna meningkatkan produktivitas, efisiensi, dan pelayanan sistem logistik nasional bagi daya saing bangsa di lingkup global yang berfokus pada keterpaduan konektivitas daratan dan maritim.",
    },
    {
      icon: "🏘️",
      title: "Permukiman & Perumahan Rakyat",
      description:
        "Mempercepat pembangunan infrastruktur permukiman dan perumahan rakyat untuk mendukung layanan infrastruktur dasar yang layak dalam rangka mewujudkan kualitas hidup manusia Indonesia sejalan dengan prinsip infrastruktur untuk semua.",
    },
    {
      icon: "🌍",
      title: "Pembangunan dari Pinggiran",
      description:
        "Mempercepat pembangunan infrastruktur Perumahan dan Permukiman secara terpadu dari pinggiran untuk mendukung keseimbangan pembangunan antar daerah, terutama di kawasan tertinggal, kawasan perbatasan, dan kawasan pedesaan, dalam kerangka NKRI.",
    },
    {
      icon: "⚙️",
      title: "Tata Kelola Organisasi",
      description:
        "Meningkatkan tata kelola sumber daya organisasi untuk mendukung fungsi manajemen meliputi perencanaan yang terpadu, pengorganisasian yang efisien, pelaksanaan yang tepat, dan pengawasan yang ketat.",
    },
  ];

  return (
    <section id="tentang" className="py-16 sm:py-20 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Tentang Kami
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
            Dinas <span className="text-emerald-600">PERKIM</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Dinas Perumahan dan Kawasan Permukiman Kabupaten Lombok Timur
          </p>
        </div>

        {/* About Content */}
        <div className="max-w-6xl mx-auto">
          {/* Intro Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-slate-100 p-6 sm:p-8 lg:p-10 mb-10 sm:mb-12">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">
              {/* Logo/Icon */}
              <div className="shrink-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-200">
                  <span className="text-5xl sm:text-6xl">🏛️</span>
                </div>
              </div>

              {/* Description */}
              <div className="text-center lg:text-left flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">
                  Dinas Perumahan dan Kawasan Permukiman
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                  Dinas PERKIM Kabupaten Lombok Timur merupakan instansi
                  pemerintah yang bertanggung jawab dalam pengembangan dan
                  pengelolaan infrastruktur perumahan serta kawasan permukiman
                  di wilayah Kabupaten Lombok Timur. Kami berkomitmen untuk
                  menyediakan hunian yang layak dan terjangkau bagi seluruh
                  masyarakat.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <span className="text-emerald-500">📍</span>
                    Lombok Timur, NTB
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <span className="text-emerald-500">📞</span>
                    (0376) 123-456
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <span className="text-emerald-500">✉️</span>
                    perkim@lotim.go.id
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="mb-10 sm:mb-12">
            <div className="bg-linear-to-r from-emerald-600 to-teal-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-center relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                ></div>
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4 sm:mb-6">
                  <span>🎯</span>
                  VISI
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-relaxed max-w-4xl mx-auto">
                  "Terwujudnya Infrastruktur Perumahan dan Permukiman dan
                  Perumahan Rakyat yang Handal dalam Mendukung Indonesia yang
                  Berdaulat, Mandiri, dan Berkepribadian Berlandaskan Gotong
                  Royong"
                </h3>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div>
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                <span>📋</span>
                MISI
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-800">
                5 Misi Strategis Kami
              </h3>
            </div>

            {/* Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {misiList.map((item, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 ${
                    index === 4 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  {/* Number Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-xl sm:text-2xl">
                      {item.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      Misi {index + 1}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-slate-800 mb-2 sm:mb-3">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
