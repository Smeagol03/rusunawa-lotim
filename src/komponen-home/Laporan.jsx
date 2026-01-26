import React from "react";

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
      // Import dynamically to avoid top-level issues if any, or just consistent with usage
      const { database } = await import("/src/config/firebase");
      const { ref, push, serverTimestamp } = await import("firebase/database");
      const { logAktivitas, TIPE_NOTIFIKASI } = await import(
        "/src/config/notifikasi"
      );

      const laporanRef = ref(database, "laporan");
      await push(laporanRef, {
        ...formData,
        tanggal: new Date().toISOString(),
        status: "unread", // Default status for admin to see
        timestamp: serverTimestamp(),
      });

      // Log aktivitas untuk notifikasi admin
      await logAktivitas(
        TIPE_NOTIFIKASI.LAPORAN_BARU,
        `Laporan baru dari ${formData.nama}`,
        { nama: formData.nama, nohp: formData.nohp }
      );

      alert("Laporan berhasil dikirim! Terima kasih atas masukan Anda.");
      setFormData({ nama: "", nohp: "", laporan: "" }); // Reset form
    } catch (error) {
      alert("Terjadi kesalahan saat mengirim laporan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center py-16">
      <div className="w-full max-w-md px-10 md:px-0">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">
          Laporan Keluhan
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Berikan laporan terkait keluhan atau masalah yang ada di Rumah Susun
          Sederhana.
        </p>
        <form id="laporan-form" className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nama" className="sr-only">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Nama"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="nohp" className="sr-only">
              No HP
            </label>
            <input
              type="tel"
              id="nohp"
              name="nohp"
              value={formData.nohp}
              onChange={handleChange}
              placeholder="No HP WhatsApp (rekomendasi)"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="laporan" className="sr-only">
              Laporan
            </label>
            <textarea
              id="laporan"
              name="laporan"
              value={formData.laporan}
              onChange={handleChange}
              placeholder="Laporan"
              rows="4"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none disabled:bg-gray-100"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? "Mengirim..." : "Kirim"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Laporan;
