import React from "react";
import {
  UserIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const Laporan = () => {
  const [formData, setFormData] = React.useState({
    nama: "",
    nohp: "",
    laporan: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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

      alert("Laporan berhasil dikirim! Terima kasih atas masukan Anda.");
      setFormData({ nama: "", nohp: "", laporan: "" });
    } catch (error) {
      alert("Terjadi kesalahan saat mengirim laporan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="kontak"
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-[-10%] left-[-5%] w-160 h-160 bg-emerald-50 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
          {/* Left Side: Info and Branding */}
          <div className="lg:w-1/2 flex flex-col justify-center space-y-8 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 w-fit">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-600" />
              <span className="text-xs font-bold text-amber-700 tracking-widest uppercase">
                Pusat Bantuan
              </span>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                Ada Kendala? <br />
                <span className="text-emerald-600">Laporkan Segera.</span>
              </h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-md">
                Kami berkomitmen memberikan layanan terbaik. Laporkan keluhan
                Anda terkait fasilitas atau layanan Rusunawa untuk perbaikan
                yang lebih cepat.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-start gap-4 group hover:bg-white hover:shadow-xl hover:shadow-emerald-100 transition-all">
                <div className="p-3 rounded-2xl bg-white text-emerald-600 shadow-sm transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  <InformationCircleIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Respon Cepat</h4>
                  <p className="text-sm text-slate-500 font-medium">
                    Tim kami menanggapi setiap laporan dalam 24 jam kerja.
                  </p>
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-start gap-4 group hover:bg-white hover:shadow-xl hover:shadow-emerald-100 transition-all">
                <div className="p-3 rounded-2xl bg-white text-emerald-600 shadow-sm transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  <ShieldCheckIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Privasi Terjaga</h4>
                  <p className="text-sm text-slate-500 font-medium">
                    Data pelapor akan dijamin kerahasiaannya secara sistem.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form Card */}
          <div className="lg:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-emerald-600 to-teal-500 rounded-[40px] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-2xl">
                <form
                  id="laporan-form"
                  className="space-y-6"
                  onSubmit={handleSubmit}
                >
                  {/* Nama Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        placeholder="Masukkan nama Anda"
                        required
                        disabled={isSubmitting}
                        className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* No HP Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      Nomor WhatsApp
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <PhoneIcon className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="tel"
                        name="nohp"
                        value={formData.nohp}
                        onChange={handleChange}
                        placeholder="0812-xxxx-xxxx"
                        required
                        disabled={isSubmitting}
                        className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Laporan Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      Isi Laporan / Keluhan
                    </label>
                    <div className="relative">
                      <div className="absolute top-4 left-4 pointer-events-none">
                        <ChatBubbleLeftRightIcon className="h-5 w-5 text-slate-400" />
                      </div>
                      <textarea
                        name="laporan"
                        value={formData.laporan}
                        onChange={handleChange}
                        placeholder="Tuliskan keluhan Anda secara detail di sini..."
                        rows="5"
                        required
                        disabled={isSubmitting}
                        className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all resize-none disabled:opacity-50"
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full flex items-center justify-center py-4 bg-slate-900 text-white font-black rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-200 active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 w-3 bg-emerald-600 transition-all duration-400 ease-out group-hover:w-full"></div>
                    <span className="relative flex items-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Mengirim...
                        </>
                      ) : (
                        <>
                          Kirim Laporan
                          <PaperAirplaneIcon className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper Icon for the card
function ShieldCheckIcon(props) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

export default Laporan;
