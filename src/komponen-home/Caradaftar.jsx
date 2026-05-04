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
    <section id="caradaftar" className="relative py-32 lg:py-48 bg-slate-50 overflow-hidden">
      {/* Editorial Background Element */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-[0.02] select-none">
        <h2 className="text-[25rem] font-black leading-none tracking-tighter -ml-20 -mt-20">DAFTAR</h2>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-32 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm"
          >
            <DocumentCheckIcon className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Alur Pendaftaran Resmi</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]"
          >
            Langkah Cepat <br />
            <span className="text-slate-400 italic font-serif">Menuju Hunian.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl"
          >
            Sistem pendaftaran kami dirancang transparan dan sepenuhnya digital untuk mempermudah akses hunian bagi seluruh masyarakat.
          </motion.p>
        </div>

        {/* Vertical Informative Timeline */}
        <div className="relative space-y-12">
          {/* Central Line (Desktop) */}
          <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 hidden lg:block"></div>

          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-24 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Step Content */}
              <div className="w-full lg:w-1/2">
                <div className="p-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500">
                  <div className="bg-slate-50 rounded-[calc(2.5rem-0.5rem)] p-8 lg:p-12 space-y-6 relative overflow-hidden">
                    
                    {/* Watermark Number */}
                    <span className="absolute -top-6 -right-4 text-9xl font-mono font-black text-white/80 select-none pointer-events-none">
                      {item.step}
                    </span>

                    <div className="relative z-10 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-slate-900 shadow-sm">
                          <item.icon className="w-7 h-7" />
                        </div>
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
                          {item.tag}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                          {item.title}
                        </h3>
                        <p className="text-slate-500 font-medium leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Central Indicator (Dot) */}
              <div className="absolute left-0 lg:left-1/2 w-4 h-4 bg-emerald-500 rounded-full -translate-x-1/2 border-4 border-white shadow-lg z-20 hidden lg:block"></div>

              {/* Empty Spacer for Layout Balance */}
              <div className="hidden lg:block lg:w-1/2"></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-40 text-center"
        >
          <a
            href="/daftar"
            className="group relative inline-flex items-center justify-center pl-10 pr-2 py-2 font-bold text-white bg-slate-900 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/20 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-6 text-sm uppercase tracking-[0.2em] font-black">
              Mulai Daftar Sekarang
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-emerald-600 transition-all duration-500">
                <ArrowRightIcon className="w-6 h-6" />
              </div>
            </span>
          </a>
          <p className="mt-8 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
            Proses Terverifikasi Oleh PEMDA Lombok Timur
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Caradaftar;
