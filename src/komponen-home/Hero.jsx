import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Isolated Parallax effect for background only
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 px-6 py-20"
    >
      {/* Texture Overlay (Grain) */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Parallax Background Layer */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/90 via-slate-950/40 to-slate-950 z-10" />
        <img
          src="https://picsum.photos/seed/rusunawa/1920/1080"
          alt="Latar Belakang Hunian"
          className="w-full h-[130%] object-cover opacity-60 scale-105"
        />
      </motion.div>

      {/* Static Content Layer */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto relative py-14 md:py-24 z-20 text-center"
      >
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-[9rem] font-medium text-white leading-[0.8] tracking-tighter mb-8 text-balance"
          >
            Hunian Masa <br />
            <span className="text-slate-400 italic font-serif">
              Depan Keluarga.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-base md:text-xl text-slate-400 leading-relaxed font-medium text-balance"
          >
            Penyediaan fasilitas hunian yang sehat, aman, dan terjangkau untuk
            menunjang kesejahteraan masyarakat di Kabupaten Lombok Timur.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8"
          >
            <a
              href="/daftar"
              className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white bg-emerald-600 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-600/30"
            >
              <span className="relative z-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em]">
                Mulai Pendaftaran
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a
              href="#fasilitas"
              className="group text-[10px] font-bold text-white/50 hover:text-white transition-all uppercase tracking-[0.2em] flex items-center gap-2"
            >
              <span>Pelajari Fasilitas</span>
              <div className="w-8 h-px bg-white/10 group-hover:w-12 transition-all duration-500" />
            </a>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-16 pt-24 border-t border-white/5 max-w-4xl mx-auto"
          >
            <div className="space-y-3 group">
              <p className="text-5xl md:text-6xl font-medium text-white tracking-tighter group-hover:text-emerald-400 transition-colors duration-500">
                42
              </p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
                Kamar Tersedia
              </p>
            </div>
            <div className="space-y-3 group border-y md:border-y-0 md:border-x border-white/5 py-8 md:py-0">
              <p className="text-5xl md:text-6xl font-medium text-white tracking-tighter group-hover:text-emerald-400 transition-colors duration-500">
                24/7
              </p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
                Sistem Keamanan
              </p>
            </div>
            <div className="space-y-3 group">
              <p className="text-5xl md:text-6xl font-medium text-white tracking-tighter group-hover:text-emerald-400 transition-colors duration-500">
                3-4
              </p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
                Penghuni / Kamar
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
