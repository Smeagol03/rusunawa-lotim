import {
  DocumentTextIcon,
  PencilSquareIcon,
  PaperAirplaneIcon,
  ClockIcon,
  CheckBadgeIcon,
  ArrowRightIcon,
  DocumentCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const Caradaftar = () => {
  const steps = [
    {
      step: "01",
      icon: DocumentTextIcon,
      title: "Persiapan Berkas",
      description:
        "Siapkan dokumen digital utama untuk memvalidasi identitas Anda.",
      details: [
        "KTP & Kartu Keluarga",
        "Surat Keterangan Kerja",
        "Pas Foto Terbaru",
      ],
    },
    {
      step: "02",
      icon: PencilSquareIcon,
      title: "Formulir Digital",
      description: "Lengkapi data pendaftaran melalui platform resmi kami.",
      details: ["Riwayat Pekerjaan", "Data Anggota Keluarga", "Pilihan Unit"],
    },
    {
      step: "03",
      icon: PaperAirplaneIcon,
      title: "Kirim Pengajuan",
      description: "Pastikan seluruh data akurat sebelum mengirimkan aplikasi.",
      details: ["Verifikasi Akhir", "Persetujuan Digital", "Submit Sistem"],
    },
    {
      step: "04",
      icon: ClockIcon,
      title: "Audit & Verifikasi",
      description:
        "Tim seleksi akan melakukan tinjauan mendalam terhadap berkas.",
      details: ["Cek Kelayakan", "Survey Lokasi", "Validasi Data"],
    },
    {
      step: "05",
      icon: CheckBadgeIcon,
      title: "Konfirmasi & Akad",
      description: "Proses finalisasi dan serah terima kunci unit Anda.",
      details: ["Tanda Tangan Akad", "Pembayaran Awal", "Serah Terima"],
    },
  ];

  return (
    <section
      id="caradaftar"
      className="relative py-10 lg:py-20 bg-slate-50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-emerald-50/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-white to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white shadow-sm border border-slate-200 mb-6">
            <DocumentCheckIcon className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
              Sistem Pendaftaran Terpadu
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Langkah Mudah Memiliki{" "}
            <span className="text-emerald-600">Hunian Impian</span>
          </h2>

          <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            Proses pendaftaran yang transparan, cepat, dan sepenuhnya digital
            tanpa hambatan birokrasi.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
              <SparklesIcon className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                Digital First
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-200">
              <ClockIcon className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                Hanya 10 Menit
              </span>
            </div>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-6 lg:p-8 border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300"
            >
              {/* Step Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-emerald-600 transition-colors duration-300">
                  <item.icon className="w-7 h-7 text-slate-600 group-hover:text-white transition-colors" />
                </div>
                <span className="text-3xl font-black text-slate-200 group-hover:text-emerald-100 transition-colors">
                  {item.step}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Details List */}
              <div className="space-y-3 pt-5 border-t border-slate-100">
                {item.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="text-xs font-medium text-slate-500">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-16 lg:mt-24 text-center">
          <a
            href="/daftar"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-sm uppercase tracking-wide hover:bg-slate-800 transition-all active:scale-95 shadow-lg"
          >
            Mulai Pendaftaran
            <ArrowRightIcon className="w-5 h-5" />
          </a>
          <p className="mt-4 text-slate-400 text-sm">
            Gratis dan tanpa komitmen awal
          </p>
        </div>
      </div>
    </section>
  );
};

export default Caradaftar;
