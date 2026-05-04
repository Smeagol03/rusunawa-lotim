import { motion } from "motion/react";
import {
  HomeModernIcon,
  BeakerIcon,
  BoltIcon,
  TruckIcon,
  SparklesIcon,
  ShieldCheckIcon,
  WifiIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Fasilitas = () => {
  const fasilitasList = [
    {
      icon: HomeModernIcon,
      title: "Unit Hunian",
      description: "Desain bangunan yang dirancang untuk sirkulasi udara optimal dan pencahayaan alami pada setiap lantai.",
      category: "Arsitektur",
    },
    {
      icon: ShieldCheckIcon,
      title: "Sistem Keamanan",
      description: "Pengawasan area melalui jaringan CCTV dan petugas keamanan yang bertugas dalam shift 24 jam.",
      category: "Keamanan",
    },
    {
      icon: BoltIcon,
      title: "Daya Listrik",
      description: "Penyediaan instalasi listrik mandiri untuk setiap unit hunian sesuai dengan standar teknis nasional.",
      category: "Utilitas",
    },
    {
      icon: BeakerIcon,
      title: "Pasokan Air",
      description: "Pengelolaan distribusi air bersih yang terintegrasi untuk menjamin ketersediaan harian bagi seluruh penghuni.",
      category: "Utilitas",
    },
    {
      icon: TruckIcon,
      title: "Lahan Parkir",
      description: "Tersedia area parkir khusus bagi kendaraan roda dua dan roda empat dengan penataan yang teratur.",
      category: "Sarana",
    },
    {
      icon: UserGroupIcon,
      title: "Balai Warga",
      description: "Ruang pertemuan serbaguna yang dapat digunakan untuk kegiatan koordinasi dan interaksi sosial penghuni.",
      category: "Sosial",
    },
    {
      icon: WifiIcon,
      title: "Konektivitas",
      description: "Penyediaan titik akses internet publik pada area bersama untuk mendukung kebutuhan digital penghuni.",
      category: "Teknologi",
    },
    {
      icon: SparklesIcon,
      title: "Taman Terbuka",
      description: "Area terbuka hijau yang dikelola untuk menjaga keseimbangan ekosistem dan keasrian lingkungan.",
      category: "Lingkungan",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="fasilitas" className="relative py-32 lg:py-52 bg-slate-50 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Formal Header */}
        <div className="max-w-4xl mb-32 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Standar Layanan</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-8xl font-medium text-slate-900 tracking-tightest leading-[0.9] text-balance"
          >
            Fasilitas & Sarana <br />
            <span className="text-slate-400 italic font-serif">Prasarana Utama.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 leading-relaxed max-w-2xl text-balance font-medium"
          >
            Daftar fasilitas pendukung yang dikelola secara profesional untuk menjamin standar kenyamanan dan keamanan harian bagi seluruh penghuni Rusunawa.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6"
        >
          {fasilitasList.map((item, index) => {
            // Define different span sizes for bento effect
            const spans = [
              "md:col-span-3 lg:col-span-4", // Unit Hunian
              "md:col-span-3 lg:col-span-4", // Sistem Keamanan
              "md:col-span-3 lg:col-span-4", // Daya Listrik
              "md:col-span-3 lg:col-span-3", // Pasokan Air
              "md:col-span-6 lg:col-span-6", // Lahan Parkir
              "md:col-span-3 lg:col-span-3", // Balai Warga
              "md:col-span-3 lg:col-span-4", // Konektivitas
              "md:col-span-3 lg:col-span-8", // Taman Terbuka
            ];
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group relative p-8 bg-white border border-slate-200/60 rounded-3xl flex flex-col justify-between gap-12 hover:border-emerald-500/30 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(16,185,129,0.05)] ${spans[index] || "md:col-span-3 lg:col-span-4"}`}
              >
                {/* Spotlight effect on hover (simulated) */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10 w-14 h-14 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl group-hover:bg-emerald-500 group-hover:border-emerald-400 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                  <item.icon className="w-7 h-7 text-slate-400 group-hover:text-white transition-colors duration-500" />
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest block opacity-70">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight uppercase">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Informative Footer */}
        <div className="mt-40 pt-20 border-t border-slate-200">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
            <div className="space-y-4 max-w-md">
              <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">Manajemen Terpadu</p>
              <p className="text-sm font-medium text-slate-400 leading-relaxed">
                Seluruh fasilitas di atas dikelola secara terpusat oleh manajemen gedung di bawah koordinasi Dinas Perumahan dan Permukiman untuk memastikan kualitas pelayanan harian.
              </p>
            </div>
            <div className="flex flex-wrap gap-12 md:gap-24">
              <div className="space-y-2">
                <p className="text-4xl md:text-5xl font-medium text-slate-900 tracking-tighter">42</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Kamar Siap Huni</p>
              </div>
              <div className="w-px h-16 bg-slate-200 hidden sm:block"></div>
              <div className="space-y-2">
                <p className="text-4xl md:text-5xl font-medium text-slate-900 tracking-tighter">24/7</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Sistem Pemeliharaan</p>
              </div>
              <div className="w-px h-16 bg-slate-200 hidden sm:block"></div>
              <div className="space-y-2">
                <p className="text-4xl md:text-5xl font-medium text-slate-900 tracking-tighter">3-4</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Kapasitas / Unit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fasilitas;
