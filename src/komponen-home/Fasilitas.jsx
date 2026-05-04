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
    <section id="fasilitas" className="relative py-24 lg:py-40 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Formal Header */}
        <div className="max-w-3xl mb-24 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-50 border border-slate-200"
          >
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Dokumentasi Sarana</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-medium text-slate-900 tracking-tight leading-tight"
          >
            Fasilitas & Sarana <br />
            <span className="text-slate-400">Prasarana Umum.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base text-slate-500 leading-relaxed max-w-xl"
          >
            Daftar fasilitas pendukung yang dikelola untuk menunjang kenyamanan dan standar operasional harian bagi seluruh penghuni unit Rusunawa.
          </motion.p>
        </div>

        {/* Minimalist Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
        >
          {fasilitasList.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col gap-6 group"
            >
              {/* Clean Icon Container */}
              <div className="w-12 h-12 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-lg group-hover:bg-white group-hover:border-emerald-200 transition-colors duration-500">
                <item.icon className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </div>

              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight uppercase">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Informative Footer */}
        <div className="mt-32 pt-16 border-t border-slate-100">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <p className="text-sm font-medium text-slate-400 max-w-sm">
              Seluruh fasilitas di atas dikelola secara terpusat oleh manajemen gedung untuk memastikan kualitas pelayanan tetap terjaga.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="text-2xl font-bold text-slate-900 tracking-tight">120+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unit Hunian</p>
              </div>
              <div className="w-px h-10 bg-slate-100 hidden sm:block"></div>
              <div>
                <p className="text-2xl font-bold text-slate-900 tracking-tight">24/7</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pemeliharaan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fasilitas;
