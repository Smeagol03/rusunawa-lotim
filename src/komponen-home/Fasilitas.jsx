const Fasilitas = () => {
  const fasilitasList = [
    {
      icon: "🏠",
      title: "Unit Hunian Modern",
      description:
        "Unit hunian dengan desain modern, ventilasi baik, dan pencahayaan alami yang optimal",
    },
    {
      icon: "💧",
      title: "Air Bersih 24 Jam",
      description:
        "Ketersediaan air bersih sepanjang hari untuk kebutuhan sehari-hari penghuni",
    },
    {
      icon: "⚡",
      title: "Listrik Terjangkau",
      description:
        "Instalasi listrik yang aman dengan daya sesuai kebutuhan rumah tangga",
    },
    {
      icon: "🅿️",
      title: "Area Parkir",
      description:
        "Area parkir yang luas dan aman untuk kendaraan roda dua dan roda empat",
    },
    {
      icon: "🏃",
      title: "Ruang Terbuka",
      description:
        "Taman dan ruang terbuka hijau sebagai area bermain dan bersantai",
    },
    {
      icon: "🛡️",
      title: "Keamanan 24 Jam",
      description: "Sistem keamanan terpadu dengan petugas keamanan yang siaga",
    },
    {
      icon: "🕌",
      title: "Musholla",
      description:
        "Tempat ibadah yang nyaman untuk kegiatan keagamaan penghuni",
    },
    {
      icon: "🏪",
      title: "Area Komersial",
      description:
        "Ruang usaha untuk kebutuhan ekonomi dan belanja sehari-hari",
    },
  ];

  return (
    <section id="fasilitas" className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Fasilitas Lengkap
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
            Fasilitas <span className="text-emerald-600">Rusunawa</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Nikmati berbagai fasilitas lengkap yang tersedia untuk kenyamanan
            dan kemudahan hidup Anda bersama keluarga
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {fasilitasList.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl border border-slate-100 hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br from-emerald-50 to-teal-50 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3 group-hover:text-emerald-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-linear-to-r from-emerald-600 to-teal-600 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
              Tertarik untuk Tinggal di Rusunawa?
            </h3>
            <p className="text-emerald-100 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
              Segera daftarkan diri Anda dan keluarga untuk menjadi penghuni
              Rusunawa dengan harga sewa yang terjangkau
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="/daftar"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-emerald-50 active:scale-95 transition-all duration-300 text-sm sm:text-base"
              >
                <span>📝</span>
                Daftar Sekarang
              </a>
              <a
                href="#kontak"
                className="inline-flex items-center justify-center gap-2 bg-emerald-700/30 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-emerald-700/50 active:scale-95 transition-all duration-300 border border-white/20 text-sm sm:text-base"
              >
                <span>📞</span>
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fasilitas;
