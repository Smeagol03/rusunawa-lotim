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
      description: "Meningkatkan ketersediaan air bersih dan sanitasi layak untuk seluruh masyarakat.",
    },
    {
      icon: TruckIcon,
      title: "Konektivitas Wilayah",
      description: "Membangun jalan dan jembatan untuk mempermudah akses ekonomi antar wilayah.",
    },
    {
      icon: BuildingOfficeIcon,
      title: "Hunian Layak",
      description: "Menyediakan perumahan yang sehat, aman, dan terjangkau bagi penduduk Berpenghasilan Rendah.",
    },
    {
      icon: MapPinIcon,
      title: "Pemerataan Daerah",
      description: "Fokus pembangunan dari pinggiran untuk mengurangi kesenjangan antar kawasan.",
    },
    {
      icon: Cog6ToothIcon,
      title: "Tata Kelola Efisien",
      description: "Implementasi manajemen yang transparan dan akuntabel dalam setiap program kerja.",
    },
  ];

  return (
    <section id="tentang" className="relative py-32 lg:py-48 bg-white overflow-hidden">
      {/* Editorial Background Text */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[20rem] font-black leading-none tracking-tighter -mr-20">PERKIM</h2>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* VISI SECTION - Editorial Header */}
        <div className="mb-40">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-12">
              <TrophyIcon className="w-4 h-4 text-slate-900" />
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Visi Utama Kami</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-12">
              Terwujudnya Infrastruktur <br />
              <span className="text-slate-400 italic font-serif">Perumahan dan Permukiman</span> <br />
              yang Handal & Mandiri.
            </h2>

            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl">
              Dedikasi penuh untuk mentransformasi wajah hunian di Kabupaten Lombok Timur melalui pembangunan berkelanjutan.
            </p>
          </motion.div>
        </div>

        {/* MISI SECTION - Asymmetric Grid */}
        <div className="mb-40">
          <div className="flex flex-col lg:flex-row gap-20 items-start">
            <div className="lg:w-1/3 sticky top-32 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-4">
                <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em]">Misi Strategis</span>
              </div>
              <h3 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none">
                Pilar <br /> Pembangunan.
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Lima instrumen strategis yang kami gunakan untuk mewujudkan kawasan permukiman terintegrasi dan inklusif.
              </p>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
              {misiList.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-2 bg-slate-50 rounded-[2rem] border border-slate-100 transition-colors duration-500 hover:bg-slate-100"
                >
                  <div className="h-full bg-white rounded-[calc(2rem-0.5rem)] p-8 border border-white shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-slate-200/50">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-black text-slate-900 mb-3 uppercase tracking-tight">{item.title}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CONTACT SECTION - High End Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group p-2 bg-slate-950 rounded-[3rem] border border-slate-800"
        >
          <div className="bg-slate-900 rounded-[calc(3rem-0.5rem)] p-12 md:p-20 overflow-hidden relative">
            {/* Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-emerald-500/10 via-transparent to-transparent opacity-30 pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
              <div className="space-y-12">
                <div className="space-y-6">
                  <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
                    Layanan <br /> Informasi Terpadu.
                  </h3>
                  <p className="text-slate-400 font-medium max-w-sm">
                    Hubungi tim kami untuk konsultasi program bantuan rumah atau pelaporan lingkungan.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    { icon: MapPinIcon, text: "Jl. Raya Selong, Lombok Timur, NTB" },
                    { icon: PhoneIcon, text: "(0376) 123-456 / +62 812 3456 7890" },
                    { icon: EnvelopeIcon, text: "perkim@lotim.go.id" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-6 group/item cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:bg-emerald-600 group-hover/item:border-emerald-500 transition-all duration-500">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-slate-300 font-bold text-sm tracking-wide group-hover/item:text-white transition-colors">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Island */}
              <div className="flex flex-col justify-center">
                <div className="p-12 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 text-center space-y-8">
                  <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-600/20">
                    <EnvelopeIcon className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-white uppercase tracking-tight">Kirim Pesan</h4>
                    <p className="text-slate-400 text-sm font-medium">Tim kami akan merespon dalam 24 jam kerja.</p>
                  </div>
                  <button className="w-full py-5 bg-white text-slate-900 font-black rounded-full uppercase tracking-widest text-xs hover:bg-emerald-50 transition-all active:scale-95 flex items-center justify-center gap-3">
                    Buka Chat Sekarang <ArrowUpRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
