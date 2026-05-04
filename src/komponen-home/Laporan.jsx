import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  UserIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const Laporan = () => {
  const [formData, setFormData] = React.useState({
    nama: "",
    nohp: "",
    laporan: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { database } = await import("/src/config/firebase");
      const { ref, push, serverTimestamp } = await import("firebase/database");
      const { logAktivitas, TIPE_NOTIFIKASI } = await import("/src/config/notifikasi");

      const laporanRef = ref(database, "laporan");
      await push(laporanRef, {
        ...formData,
        tanggal: new Date().toISOString(),
        status: "unread",
        timestamp: serverTimestamp(),
      });

      await logAktivitas(
        TIPE_NOTIFIKASI.LAPORAN_BARU,
        `Laporan baru dari ${formData.nama}`,
        { nama: formData.nama, nohp: formData.nohp },
      );

      setIsSuccess(true);
      setFormData({ nama: "", nohp: "", laporan: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      alert("Terjadi kesalahan saat mengirim laporan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all disabled:opacity-50";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 mb-2 block";

  return (
    <section id="kontak" className="relative py-32 lg:py-48 bg-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-24">
          
          {/* Left Side: Info */}
          <div className="lg:w-1/2 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100">
                <ExclamationTriangleIcon className="w-4 h-4 text-amber-600" />
                <span className="text-[10px] font-black text-amber-700 uppercase tracking-[0.2em]">Pusat Bantuan</span>
              </div>

              <h2 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                Ada Kendala? <br />
                <span className="text-emerald-600 italic font-serif">Laporkan Segera.</span>
              </h2>

              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-md">
                Kami berkomitmen memberikan layanan terbaik. Laporkan keluhan Anda terkait fasilitas atau layanan Rusunawa.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: InformationCircleIcon, title: "Respon Cepat", desc: "Tanggapan dalam 24 jam kerja." },
                { icon: ShieldCheckIcon, title: "Privasi Terjaga", desc: "Data dijamin kerahasiaannya." },
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex flex-col gap-6"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:w-1/2 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group p-2 bg-slate-50 rounded-[3rem] border border-slate-100"
            >
              <div className="relative bg-white rounded-[calc(3rem-0.5rem)] p-8 md:p-12 shadow-sm border border-white overflow-hidden">
                
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit}
                      className="space-y-8"
                    >
                      <div className="space-y-6">
                        <div className="relative">
                          <label className={labelClass}>Nama Lengkap</label>
                          <div className="absolute top-[38px] left-4 text-slate-400">
                            <UserIcon className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            name="nama"
                            value={formData.nama}
                            onChange={handleChange}
                            placeholder="Masukkan nama Anda"
                            required
                            disabled={isSubmitting}
                            className={inputClass}
                          />
                        </div>

                        <div className="relative">
                          <label className={labelClass}>Nomor WhatsApp</label>
                          <div className="absolute top-[38px] left-4 text-slate-400">
                            <PhoneIcon className="w-5 h-5" />
                          </div>
                          <input
                            type="tel"
                            name="nohp"
                            value={formData.nohp}
                            onChange={handleChange}
                            placeholder="0812-xxxx-xxxx"
                            required
                            disabled={isSubmitting}
                            className={inputClass}
                          />
                        </div>

                        <div className="relative">
                          <label className={labelClass}>Detail Keluhan</label>
                          <div className="absolute top-[38px] left-4 text-slate-400">
                            <ChatBubbleLeftRightIcon className="w-5 h-5" />
                          </div>
                          <textarea
                            name="laporan"
                            value={formData.laporan}
                            onChange={handleChange}
                            placeholder="Tuliskan keluhan Anda secara detail..."
                            rows="5"
                            required
                            disabled={isSubmitting}
                            className={`${inputClass} resize-none`}
                          ></textarea>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full flex items-center justify-center py-5 bg-slate-900 text-white font-black rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/20 active:scale-95 disabled:opacity-70"
                      >
                        <div className="absolute inset-0 w-2 bg-emerald-600 transition-all duration-500 ease-out group-hover:w-full"></div>
                        <span className="relative flex items-center gap-4 text-sm uppercase tracking-widest">
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Memproses...
                            </>
                          ) : (
                            <>
                              Kirim Laporan
                              <PaperAirplaneIcon className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                          )}
                        </span>
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-20 text-center space-y-8"
                    >
                      <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircleIcon className="w-12 h-12 text-emerald-600" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Terkirim!</h3>
                        <p className="text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
                          Terima kasih atas laporan Anda. Tim kami akan segera menindaklanjuti.
                        </p>
                      </div>
                      <button 
                        onClick={() => setIsSuccess(false)}
                        className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-700 transition-colors"
                      >
                        Kirim Laporan Lain
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Laporan;
