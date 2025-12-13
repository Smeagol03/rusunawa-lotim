const Caradaftar = () => {
  const steps = [
    {
      step: 1,
      icon: "📋",
      title: "Siapkan Dokumen",
      description:
        "Siapkan dokumen persyaratan seperti KTP, KK, Surat Penghasilan, dan dokumen pendukung lainnya",
      details: [
        "Fotokopi KTP",
        "Fotokopi Kartu Keluarga",
        "Surat Keterangan Penghasilan",
      ],
    },
    {
      step: 2,
      icon: "📝",
      title: "Isi Formulir Online",
      description:
        "Kunjungi halaman pendaftaran dan isi formulir dengan data yang lengkap dan benar",
      details: ["Data pribadi", "Informasi kontak", "Data pekerjaan"],
    },
    {
      step: 3,
      icon: "📤",
      title: "Kirim Pendaftaran",
      description:
        "Periksa kembali data Anda, centang persetujuan, lalu kirim formulir pendaftaran",
      details: [
        "Verifikasi data",
        "Setujui syarat & ketentuan",
        "Submit formulir",
      ],
    },
    {
      step: 4,
      icon: "⏳",
      title: "Tunggu Verifikasi",
      description:
        "Tim kami akan memverifikasi data dan dokumen Anda dalam waktu 3-5 hari kerja",
      details: [
        "Pengecekan dokumen",
        "Validasi data",
        "Konfirmasi via telepon",
      ],
    },
    {
      step: 5,
      icon: "✅",
      title: "Konfirmasi & Survei",
      description:
        "Setelah lolos verifikasi, Anda akan dihubungi untuk survei lokasi unit hunian",
      details: [
        "Penjadwalan survei",
        "Pemilihan unit",
        "Penandatanganan kontrak",
      ],
    },
  ];

  return (
    <section id="caradaftar" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block bg-teal-100 text-teal-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Panduan Pendaftaran
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
            Cara <span className="text-teal-600">Mendaftar</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Ikuti langkah-langkah mudah berikut untuk mendaftar sebagai calon
            penghuni Rusunawa
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="max-w-5xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-[105px] left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full"></div>

              {/* Steps */}
              <div className="grid grid-cols-5 gap-4">
                {steps.map((item, index) => (
                  <div key={index} className="relative">
                    {/* Step Circle */}
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-linear-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-4xl shadow-lg shadow-emerald-200 mb-4 relative z-10">
                        {item.icon}
                      </div>
                      <div className="w-10 h-10 bg-white border-4 border-teal-500 rounded-full flex items-center justify-center font-bold text-teal-600 text-lg -mt-2 relative z-20">
                        {item.step}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center mt-6">
                      <h3 className="font-bold text-slate-800 text-lg mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-3">
                        {item.description}
                      </p>
                      <ul className="text-xs text-slate-500 space-y-1">
                        {item.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-center justify-center gap-1"
                          >
                            <span className="text-teal-500">✓</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile & Tablet Timeline */}
          <div className="lg:hidden space-y-6">
            {steps.map((item, index) => (
              <div key={index} className="relative flex gap-4 sm:gap-6">
                {/* Left Side - Step Number & Line */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-lg">
                    {item.icon}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-linear-to-b from-teal-500 to-teal-200 mt-3"></div>
                  )}
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 pb-8">
                  <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-100">
                    {/* Step Badge */}
                    <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mb-3">
                      <span>Langkah {item.step}</span>
                    </div>

                    <h3 className="font-bold text-slate-800 text-lg sm:text-xl mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Details */}
                    <div className="flex flex-wrap gap-2">
                      {item.details.map((detail, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 bg-white text-slate-600 text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-slate-200"
                        >
                          <span className="text-teal-500">✓</span>
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-slate-600 mb-6 text-sm sm:text-base">
            Sudah siap mendaftar? Klik tombol di bawah untuk memulai pendaftaran
          </p>
          <a
            href="/daftar"
            className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 text-white font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg active:scale-95 transition-all duration-300 text-sm sm:text-base"
          >
            <span className="text-xl">📝</span>
            Mulai Pendaftaran
          </a>
        </div>
      </div>
    </section>
  );
};

export default Caradaftar;
