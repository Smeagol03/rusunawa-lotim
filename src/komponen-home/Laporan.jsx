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
      const { logAktivitas, TIPE_NOTIFIKASI } =
        await import("/src/config/notifikasi");

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

  const inputClass =
    "block w-full px-6 py-5 bg-white border-2 border-slate-200 rounded-none text-slate-950 text-sm font-medium focus:outline-none focus:border-slate-950 transition-all disabled:opacity-50 placeholder:text-slate-300";
  const labelClass =
    "text-[11px] font-bold text-slate-950 uppercase tracking-[0.3em] mb-4 block";

  return (
    <section id="kontak" className="relative py-32 lg:py-60 bg-white overflow-hidden border-t border-slate-100">
      {/* Texture Overlay (Grain) */}
      <div className="grain-overlay" />

      <div className="container mx-auto px-6 max-w-7xl relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Side: Swiss Header & Info */}
          <div className="lg:col-span-5 space-y-16 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="flex items-center gap-4">
                <div className="w-6 h-1 bg-slate-950" />
                <span className="text-[11px] font-bold text-slate-950 uppercase tracking-[0.4em]">
                  Pusat Pelaporan
                </span>
              </div>

              <h2 className="text-5xl md:text-8xl font-medium text-slate-950 tracking-tightest leading-[0.8] text-balance">
                ADA <br />
                KENDALA?
              </h2>

              <div className="space-y-6 border-l-4 border-emerald-500 pl-8">
                <p className="text-xl text-slate-900 font-medium leading-tight max-w-sm text-balance">
                  Laporkan keluhan Anda terkait fasilitas atau layanan hunian
                  secara objektif dan transparan.
                </p>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                  Kami berkomitmen untuk memproses setiap laporan dalam siklus
                  24 jam kerja untuk menjamin kualitas hidup di Rusunawa.
                </p>
              </div>
            </motion.div>

            {/* Utility Grid */}
            <div className="grid grid-cols-2 gap-px bg-slate-200 border border-slate-200 overflow-hidden">
              {[
                { title: "SLA", value: "24H", desc: "Respons harian" },
                { title: "DATA", value: "SEC", desc: "Enkripsi penuh" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 space-y-4"
                >
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {item.title}
                  </p>
                  <p className="text-4xl font-medium text-slate-950 tracking-tighter">
                    {item.value}
                  </p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Rigid Form */}
          <div className="lg:col-span-7 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-950 p-1 lg:p-1.5"
            >
              <div className="bg-white p-8 lg:p-16">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, x: 20 }}
                      onSubmit={handleSubmit}
                      className="space-y-12"
                    >
                      <div className="space-y-10">
                        <div>
                          <label className={labelClass}>
                            01. Identitas Pelapor
                          </label>
                          <input
                            type="text"
                            name="nama"
                            value={formData.nama}
                            onChange={handleChange}
                            placeholder="NAMA LENGKAP"
                            required
                            disabled={isSubmitting}
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className={labelClass}>
                            02. Kontak WhatsApp
                          </label>
                          <input
                            type="tel"
                            name="nohp"
                            value={formData.nohp}
                            onChange={handleChange}
                            placeholder="08XX XXXX XXXX"
                            required
                            disabled={isSubmitting}
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className={labelClass}>
                            03. Deskripsi Keluhan
                          </label>
                          <textarea
                            name="laporan"
                            value={formData.laporan}
                            onChange={handleChange}
                            placeholder="TULISKAN KELUHAN SECARA DETAIL DAN OBJEKTIF..."
                            rows="6"
                            required
                            disabled={isSubmitting}
                            className={`${inputClass} resize-none`}
                          ></textarea>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full flex items-center justify-between px-10 py-6 bg-slate-950 text-white font-bold transition-all active:scale-[0.98] disabled:opacity-50"
                      >
                        <span className="relative z-10 text-[11px] uppercase tracking-[0.4em]">
                          {isSubmitting ? "Processing..." : "Lapor"}
                        </span>
                        <div className="absolute inset-0 bg-emerald-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                        <span className="relative z-10">
                          <PaperAirplaneIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                        </span>
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-24 text-center space-y-12"
                    >
                      <div className="w-24 h-24 bg-slate-950 flex items-center justify-center mx-auto">
                        <CheckCircleIcon className="w-12 h-12 text-emerald-500" />
                      </div>
                      <div className="space-y-6">
                        <h3 className="text-4xl font-medium text-slate-950 tracking-tightest uppercase">
                          Success.
                        </h3>
                        <p className="text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
                          Laporan Anda telah terarsip dalam sistem. Tim teknis
                          kami akan segera melakukan verifikasi.
                        </p>
                      </div>
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="text-[10px] font-bold text-slate-950 uppercase tracking-[0.3em] border-b-2 border-slate-950 pb-1 hover:text-emerald-600 hover:border-emerald-600 transition-all"
                      >
                        File Another Report
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
