import { useState } from "react";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  BuildingOffice2Icon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

const Footer = () => {
  const [formData, setFormData] = useState({
    nama: "",
    nomor: "",
    subjek: "",
    pesan: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulasi pengiriman
    setTimeout(() => {
      alert("Pesan Anda telah terkirim. Terima kasih!");
      setFormData({ nama: "", nomor: "", subjek: "", pesan: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <footer
      id="kontak"
      className="bg-linear-to-b from-slate-800 to-slate-900 text-white"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Kolom 1: Informasi Instansi & Kontak */}
          <div className="space-y-6">
            {/* Logo & Nama Instansi */}
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-16 h-16 bg-white rounded-lg p-2 flex items-center justify-center shadow-lg">
                <BuildingOffice2Icon className="w-10 h-10 text-slate-800" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  Dinas Perumahan dan
                  <br />
                  Kawasan Permukiman
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  Kabupaten Lombok Timur
                </p>
              </div>
            </div>

            {/* Deskripsi */}
            <p className="text-slate-400 text-sm leading-relaxed border-l-4 border-amber-500 pl-4">
              Melayani masyarakat dalam penyediaan rumah susun sewa sederhana
              (Rusunawa) yang layak, aman, dan terjangkau bagi masyarakat
              berpenghasilan rendah di Kabupaten Lombok Timur.
            </p>

            {/* Informasi Kontak */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                Informasi Kontak
              </h4>

              <div className="space-y-3">
                <div className="flex items-start gap-3 group">
                  <div className="shrink-0 w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                    <MapPinIcon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-300">
                      Jl. Prof. M. Yamin, SH No. 2
                    </p>
                    <p className="text-sm text-slate-400">
                      Selong, Lombok Timur, NTB 83612
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="shrink-0 w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                    <PhoneIcon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-300">(0376) 21234</p>
                    <p className="text-xs text-slate-500">Telepon Kantor</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="shrink-0 w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                    <EnvelopeIcon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-300">
                      perkim@lomboktimur.go.id
                    </p>
                    <p className="text-xs text-slate-500">Email Resmi</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="shrink-0 w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                    <ClockIcon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-300">
                      Senin - Jumat: 08.00 - 16.00 WITA
                    </p>
                    <p className="text-xs text-slate-500">Jam Operasional</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom 2: Peta Lokasi */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <MapPinIcon className="w-4 h-4" />
              Lokasi Kantor
            </h4>

            <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.9613927858904!2d116.56414537413639!3d-8.695216288580488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcc4fe7184063f3%3A0x2f11274ab7e4bcbb!2sRUSUNAWA%20LABUHAN%20HAJI!5e0!3m2!1sid!2sid!4v1765419700217!5m2!1sid!2sid"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Dinas Perkim Lombok Timur"
              ></iframe>
            </div>

            <a
              href="https://maps.google.com/?q=Kantor+Bupati+Lombok+Timur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
            >
              <MapPinIcon className="w-4 h-4" />
              Buka di Google Maps
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Kolom 3: Form Kirim Pesan */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <EnvelopeIcon className="w-4 h-4" />
              Kirim Pesan
            </h4>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 ring-1 ring-white/10 shadow-xl">
              <p className="text-sm text-slate-400 mb-4">
                Sampaikan pertanyaan, saran, atau pengaduan Anda kepada kami.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="nama"
                    className="block text-xs font-medium text-slate-300 mb-1"
                  >
                    Nama Lengkap <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                <div>
                  <label
                    htmlFor="nomor"
                    className="block text-xs font-medium text-slate-300 mb-1"
                  >
                    Nomor Telepon <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    id="nomor"
                    name="nomor"
                    value={formData.nomor}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                    placeholder="Contoh: 081234567890"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subjek"
                    className="block text-xs font-medium text-slate-300 mb-1"
                  >
                    Subjek <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="subjek"
                    name="subjek"
                    value={formData.subjek}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                  >
                    <option value="">Pilih Subjek</option>
                    <option value="informasi">Informasi Umum</option>
                    <option value="pendaftaran">Pendaftaran Rusunawa</option>
                    <option value="pengaduan">Pengaduan</option>
                    <option value="saran">Saran & Masukan</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="pesan"
                    className="block text-xs font-medium text-slate-300 mb-1"
                  >
                    Pesan <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="pesan"
                    name="pesan"
                    value={formData.pesan}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold rounded-lg shadow-lg shadow-amber-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-5 h-5" />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700/50 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>© {new Date().getFullYear()}</span>
              <span className="text-slate-600">|</span>
              <span>Dinas Perumahan dan Kawasan Permukiman</span>
              <span className="text-slate-600">|</span>
              <span>Kabupaten Lombok Timur</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm">
              <a
                href="#"
                className="text-slate-400 hover:text-amber-400 transition-colors"
              >
                Kebijakan Privasi
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-amber-400 transition-colors"
              >
                Syarat & Ketentuan
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-amber-400 transition-colors"
              >
                Peta Situs
              </a>
            </div>
          </div>

          {/* Government Badge */}
          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-500">
            <BuildingOffice2Icon className="w-4 h-4" />
            <span>
              Website Resmi Pemerintah Kabupaten Lombok Timur, Nusa Tenggara
              Barat
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
