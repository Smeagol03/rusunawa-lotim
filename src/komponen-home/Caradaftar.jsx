import { motion } from "motion/react";
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
      step: "01",
      icon: DocumentTextIcon,
      title: "Persiapan Berkas",
      description: "Siapkan dokumen digital utama seperti KTP, Kartu Keluarga, dan Surat Keterangan Kerja untuk memvalidasi identitas Anda secara digital.",
      tag: "Prasyarat",
    },
    {
      step: "02",
      icon: PencilSquareIcon,
      title: "Pengisian Formulir",
      description: "Lengkapi data pendaftaran melalui platform resmi kami. Pastikan riwayat pekerjaan dan data keluarga diisi dengan akurat.",
      tag: "Digital Form",
    },
    {
      step: "03",
      icon: PaperAirplaneIcon,
      title: "Kirim Pengajuan",
      description: "Lakukan verifikasi akhir pada data yang telah diinput, kemudian kirimkan aplikasi Anda ke sistem pusat kami.",
      tag: "Submission",
    },
    {
      step: "04",
      icon: ClockIcon,
      title: "Audit & Verifikasi",
      description: "Tim seleksi akan melakukan tinjauan mendalam, cek kelayakan, dan validasi data lapangan jika diperlukan.",
      tag: "Selection",
    },
    {
      step: "05",
      icon: CheckBadgeIcon,
      title: "Konfirmasi & Akad",
      description: "Setelah dinyatakan lolos, Anda akan diundang untuk tanda tangan akad dan serah terima kunci unit hunian.",
      tag: "Finalisasi",
    },
  ];

  return (
    <section id="caradaftar" className="relative py-32 lg:py-52 bg-white overflow-hidden">
      {/* Texture Overlay (Grain) */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Editorial Background Element */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-[0.02] select-none z-0">
        <h2 className="text-[25rem] font-black leading-none tracking-tightest -ml-20 -mt-20">DAFTAR</h2>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-20">
        
        {/* Header Section */}
        <div className="max-w-4xl mb-32 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Alur Pendaftaran Digital</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-8xl font-medium text-slate-900 tracking-tightest leading-[0.9] text-balance"
          >
            Langkah Cepat <br />
            <span className="text-slate-400 italic font-serif">Menuju Hunian.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl text-balance"
          >
            Sistem pendaftaran kami dirancang transparan, efisien, dan sepenuhnya digital untuk mempermudah akses hunian bagi masyarakat Lombok Timur.
          </motion.p>
        </div>

        {/* Vertical Informative Timeline */}
        <div className="relative space-y-24 lg:space-y-4">
          {/* Central Line (Desktop) */}
          <div className="absolute left-0 lg:left-1/2 top-10 bottom-10 w-px bg-slate-100 -translate-x-1/2 hidden lg:block"></div>

          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-32 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Step Content */}
              <div className="w-full lg:w-1/2">
                <div className="group relative p-1 bg-linear-to-br from-slate-100 to-white rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-700">
                  <div className="bg-white rounded-[calc(3rem-0.25rem)] p-8 lg:p-14 space-y-8 relative overflow-hidden border border-slate-50">
                    
                    {/* Floating Step Number */}
                    <span className="absolute -top-4 -right-2 text-[8rem] lg:text-[12rem] font-serif italic text-slate-50/80 group-hover:text-emerald-50/50 transition-colors duration-700 select-none pointer-events-none z-0">
                      {item.step}
                    </span>

                    <div className="relative z-10 space-y-8">
                      <div className="flex items-center justify-between">
                        <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center text-white shadow-xl group-hover:bg-emerald-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                          <item.icon className="w-8 h-8" />
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
                          {item.tag}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-3xl font-medium text-slate-900 tracking-tighter uppercase">
                          {item.title}
                        </h3>
                        <p className="text-slate-500 font-medium leading-relaxed text-base">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Central Indicator (Dot) */}
              <div className="relative z-30 flex flex-col items-center justify-center hidden lg:flex">
                <div className="w-4 h-4 bg-white border-2 border-slate-200 rounded-full group-hover:border-emerald-500 transition-colors duration-500 shadow-sm"></div>
                <div className="absolute w-12 h-12 bg-emerald-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700"></div>
              </div>

              {/* Empty Spacer for Layout Balance */}
              <div className="hidden lg:block lg:w-1/2"></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-52 text-center"
        >
          <div className="inline-block p-1 bg-linear-to-br from-slate-100 to-white rounded-full shadow-sm mb-12">
            <a
              href="/daftar"
              className="group relative inline-flex items-center justify-center pl-10 pr-3 py-3 font-bold text-white bg-slate-950 rounded-full overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-emerald-600/20 active:scale-95"
            >
              <div className="absolute inset-0 bg-emerald-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-8 text-[11px] uppercase tracking-[0.3em] font-bold">
                Mulai Pendaftaran
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-emerald-600 transition-all duration-500">
                  <ArrowRightIcon className="w-5 h-5" />
                </div>
              </span>
            </a>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em]">
              Sistem Terintegrasi PEMDA Lombok Timur
            </p>
            <div className="flex items-center gap-6 opacity-30 grayscale contrast-125">
              {/* Placeholder for logos or trust badges */}
              <div className="h-6 w-px bg-slate-400" />
              <div className="h-6 w-px bg-slate-400" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Caradaftar;
