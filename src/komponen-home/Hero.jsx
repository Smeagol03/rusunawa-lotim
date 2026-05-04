import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  MapPinIcon,
  SparklesIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.32, 0.72, 0, 1],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-slate-950 px-6 py-20 lg:py-32"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/40 to-slate-950 z-10" />
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
          alt="Modern Housing"
          className="w-full h-[120%] object-cover opacity-60 grayscale-[20%] brightness-[0.8]"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto relative z-10 text-center"
      >
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-8xl xl:text-9xl font-black text-white leading-[0.9] tracking-tighter"
          >
            Hunian Masa <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-size-[200%_auto] animate-gradient-x">
              Depan Keluarga.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-lg md:text-2xl text-slate-300 font-medium leading-relaxed opacity-80"
          >
            Wujudkan impian memiliki hunian yang aman, nyaman, dan terjangkau di
            Kabupaten Lombok Timur. Fasilitas modern dengan ekosistem lingkungan
            yang asri.
          </motion.p>

          {/* Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
          >
            <a
              href="/daftar"
              className="group relative inline-flex items-center justify-center pl-8 pr-2 py-2 font-bold text-white bg-emerald-600 rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.5)] active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-4 text-sm uppercase tracking-widest">
                Daftar Sekarang
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-emerald-600 transition-all duration-500">
                  <ArrowRightIcon className="w-5 h-5" />
                </div>
              </span>
            </a>

            <a
              href="#fasilitas"
              className="text-sm font-bold text-white/60 hover:text-white transition-colors uppercase tracking-widest border-b border-white/10 pb-1"
            >
              Lihat Fasilitas
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-8 pt-16 border-t border-white/5 max-w-2xl mx-auto"
          >
            <div className="space-y-1">
              <p className="text-3xl font-black text-white">120+</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                Unit Tersedia
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black text-white">24/7</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                Keamanan
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black text-white">1.2k</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                Penghuni
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Badge (Parallax) */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute bottom-12 right-12 z-20 hidden xl:block"
      >
        <div className="p-6 bg-white/5 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-2xl space-y-4 max-w-[240px]">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
              <ShieldCheckIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Lombok Timur
              </p>
              <p className="text-xs font-bold text-white uppercase">Verified</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Terintegrasi dengan sistem keamanan terpadu pemerintah daerah.
          </p>
        </div>
      </motion.div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
      `,
        }}
      />
    </section>
  );
};

export default Hero;
