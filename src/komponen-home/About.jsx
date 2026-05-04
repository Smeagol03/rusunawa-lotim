import { motion } from "motion/react";
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
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";

const About = () => {
  const misiList = [
    {
      icon: GlobeAltIcon,
      title: "Infrastruktur Air",
      description:
        "Meningkatkan ketersediaan air bersih dan sanitasi layak untuk seluruh masyarakat.",
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
    <section id="tentang" className="relative py-32 lg:py-52 bg-white overflow-hidden">
      {/* Texture Overlay (Grain) */}
      <div className="grain-overlay" />

      <div className="container mx-auto px-6 max-w-7xl relative z-20">
        {/* Editorial Header */}
        <div className="max-w-5xl mb-32 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
              Visi & Misi Kami
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-medium text-slate-900 tracking-tightest leading-[0.85] text-balance"
          >
            Mewujudkan Hunian <br />
            <span className="text-slate-400 italic font-serif">
              Handal & Mandiri.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl text-balance"
          >
            Dedikasi penuh Dinas Perumahan dan Permukiman untuk mentransformasi
            wajah hunian di Kabupaten Lombok Timur melalui pembangunan
            berkelanjutan.
          </motion.p>
        </div>

        {/* Pillars Grid - Simplified */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-40">
          {misiList.slice(0, 3).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:border-emerald-500/20 transition-all duration-700 hover:shadow-2xl hover:shadow-emerald-900/5"
            >
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-8 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                <item.icon className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-medium text-slate-900 mb-4 uppercase tracking-tighter">
                {item.title}
              </h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact Strip - High End Dark Mode */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-1 bg-linear-to-br from-slate-800 to-slate-950 rounded-[3rem] shadow-2xl"
        >
          <div className="bg-slate-950 rounded-[calc(3rem-0.25rem)] p-12 lg:p-20 overflow-hidden relative">
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-emerald-500/10 blur-[120px] rounded-full opacity-50 pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
              <div className="space-y-8 max-w-xl text-center lg:text-left">
                <h3 className="text-4xl md:text-5xl font-medium text-white tracking-tighter leading-none">
                  Layanan Informasi <br />{" "}
                  <span className="text-emerald-400 italic font-serif">
                    Terpadu.
                  </span>
                </h3>
                <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-60">
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">
                      Lombok Timur
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">
                      +62 812 3456
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6">
                <a
                  href="mailto:perkim@lotim.go.id"
                  className="group relative inline-flex items-center justify-center pl-10 pr-3 py-3 font-bold text-slate-950 bg-white rounded-full overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-emerald-400/20 active:scale-95"
                >
                  <div className="absolute inset-0 bg-emerald-500 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 flex items-center gap-8 text-[11px] uppercase tracking-[0.3em] font-bold group-hover:text-white transition-colors">
                    Chat
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-white group-hover:text-emerald-600 transition-all duration-500">
                      <ArrowUpRightIcon className="w-5 h-5" />
                    </div>
                  </span>
                </a>
                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.4em]">
                  Respon cepat dalam 24 jam kerja
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
