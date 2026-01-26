import {
  DocumentTextIcon,
  PencilSquareIcon,
  PaperAirplaneIcon,
  ClockIcon,
  CheckBadgeIcon,
  ArrowRightIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";

const Caradaftar = () => {
  const steps = [
    {
      step: 1,
      icon: DocumentTextIcon,
      title: "Siapkan Dokumen",
      description:
        "Siapkan dokumen persyaratan utama untuk memperlancar proses pendaftaran Anda.",
      details: [
        "Scan KTP & KK",
        "Slip Gaji/Keterangan Penghasilan",
        "Surat Pernyataan Belum Punya Rumah",
      ],
      color: "emerald",
    },
    {
      step: 2,
      icon: PencilSquareIcon,
      title: "Isi Formulir Online",
      description:
        "Lengkapi data diri dan informasi keluarga pada form pendaftaran digital kami.",
      details: [
        "Data Pribadi Lengkap",
        "Riwayat Pekerjaan",
        "Anggota Keluarga",
      ],
      color: "teal",
    },
    {
      step: 3,
      icon: PaperAirplaneIcon,
      title: "Kirim Pendaftaran",
      description:
        "Pastikan semua data benar, lalu kirimkan berkas Anda secara sistematis.",
      details: [
        "Review Ulang Data",
        "Persetujuan S&K",
        "Konfirmasi Pengiriman",
      ],
      color: "cyan",
    },
    {
      step: 4,
      icon: ClockIcon,
      title: "Proses Verifikasi",
      description:
        "Tim admin kami akan melakukan audit internal dan pengecekan kelayakan berkas.",
      details: ["Audit Dokumen", "Validasi Ekonomi", "Survey Lapangan"],
      color: "sky",
    },
    {
      step: 5,
      icon: CheckBadgeIcon,
      title: "Penetapan & Kontrak",
      description:
        "Penandatanganan akad sewa dan serah terima kunci unit hunian baru Anda.",
      details: ["Pemilihan Unit", "Akad Sewa", "Serah Terima Kunci"],
      color: "indigo",
    },
  ];

  return (
    <section
      id="caradaftar"
      className="relative py-24 lg:py-32 bg-slate-50/50 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-160 h-160 bg-teal-100/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-160 h-160 bg-emerald-100/50 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200/50 backdrop-blur-sm border border-slate-300/50 mb-6">
            <DocumentCheckIcon className="w-5 h-5 text-slate-700" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-[0.2em]">
              Step-by-Step Guide
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Alur <span className="text-emerald-600">Pendaftaran</span>
          </h2>
          <p className="text-slate-600 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Dapatkan hunian impian Anda dengan mengikuti prosedur pendaftaran
            resmi yang transparan dan terintegrasi secara digital.
          </p>
        </div>

        {/* Steps Journey */}
        <div className="relative max-w-6xl mx-auto">
          {/* Vertical Center Line for Desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-emerald-100 via-teal-500 to-indigo-100 -translate-x-1/2 hidden lg:block rounded-full opacity-30"></div>

          <div className="space-y-12 lg:space-y-0">
            {steps.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center lg:min-h-[250px]`}
              >
                {/* Visual Connector - Circle with Step Number */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 lg:top-1/2 lg:-translate-y-1/2 z-20 hidden lg:flex items-center justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-xl border-4 border-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl font-black text-slate-900">
                      {item.step}
                    </span>
                  </div>
                </div>

                {/* Content Card */}
                <div
                  className={`w-full lg:w-[45%] ${index % 2 === 0 ? "lg:pr-16" : "lg:pl-16"}`}
                >
                  <div className="group relative bg-white rounded-[32px] p-8 shadow-sm hover:shadow-2xl hover:shadow-emerald-100/50 border border-slate-100 transition-all duration-500 hover:-translate-y-2">
                    {/* Header: Icon + Title */}
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`p-4 rounded-2xl bg-${item.color}-50 text-${item.color}-600 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <item.icon className="w-8 h-8" />
                      </div>
                      <div className="lg:hidden w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-black text-slate-500">
                        {item.step}
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-slate-500 font-medium leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Features List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {item.details.map((detail, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 group/item text-sm font-bold text-slate-600"
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600`}
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Decorative Corner Blur */}
                    <div
                      className={`absolute -bottom-2 -right-2 w-24 h-24 bg-${item.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}
                    ></div>
                  </div>
                </div>

                {/* Empty Space for Zig-Zag */}
                <div className="hidden lg:block lg:w-[45%]"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Global CTA Section */}
        <div className="mt-24 lg:mt-32 text-center animate-fadeIn group">
          <div className="relative inline-block px-10 py-16 rounded-[48px] bg-slate-900 overflow-hidden w-full max-w-4xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
            {/* Animated BG Gradients */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-1000"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-1000"></div>

            <div className="relative z-10 space-y-8">
              <h3 className="text-3xl md:text-4xl font-black text-white px-4 leading-tight">
                Sudah Menyiapkan <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">
                  Seluruh Kelengkapan?
                </span>
              </h3>
              <p className="text-slate-400 font-medium max-w-xl mx-auto">
                Klik tombol di bawah untuk masuk ke ruang formulir digital dan
                ajukan hunian impian Anda sekarang juga.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/daftar"
                  className="relative inline-flex items-center justify-center px-12 py-5 font-black text-white bg-linear-to-r from-emerald-600 to-teal-500 rounded-3xl shadow-xl shadow-emerald-500/20 group/btn transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/40 active:scale-95 overflow-hidden"
                >
                  <span className="relative flex items-center gap-3">
                    Buka Formulir Digital
                    <ArrowRightIcon className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Caradaftar;
