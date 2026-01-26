import "/src/index.css";
import React, { useState } from "react";
import { simpanPendaftar } from "/src/config/database";

/**
 * Sanitasi input untuk mencegah XSS attacks
 * Escape karakter HTML special
 */
const sanitizeInput = (str) => {
  if (typeof str !== "string") return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
};

/**
 * Sanitasi semua field dalam object
 */
const sanitizeFormData = (data) => {
  const sanitized = {};
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === "object" ? sanitizeFormData(item) : sanitizeInput(item)
      );
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeFormData(value);
    } else {
      sanitized[key] = sanitizeInput(value);
    }
  }
  return sanitized;
};

const Formulir = () => {
  const [showSpouseData, setShowSpouseData] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData);

    // Collect family members data
    const anggotaKeluarga = [];
    for (let i = 1; i <= 4; i++) {
      if (data[`anggota_${i}_nama`]) {
        anggotaKeluarga.push({
          nama: data[`anggota_${i}_nama`],
          umur: data[`anggota_${i}_umur`],
          hubungan: data[`anggota_${i}_hubungan`],
          keterangan: data[`anggota_${i}_keterangan`],
        });
      }
    }
    data.anggotaKeluarga = anggotaKeluarga;

    // Validation
    if (!data.nama || !data.nik || !data.no_hp) {
      alert("Mohon lengkapi semua field yang wajib diisi.");
      return;
    }
    if (data.nik.length !== 16) {
      alert("NIK harus 16 digit.");
      return;
    }
    if (
      showSpouseData &&
      data.nik_pasangan &&
      data.nik_pasangan.length !== 16
    ) {
      alert("NIK Pasangan harus 16 digit.");
      return;
    }

    // Sanitasi semua input sebelum simpan ke database
    data = sanitizeFormData(data);

    setIsSubmitting(true);
    simpanPendaftar(data)
      .then(() => {
        alert("Pendaftaran berhasil disubmit! ✅ Data Anda telah tersimpan.");
        e.target.reset();
        setShowSpouseData(false);
      })
      .catch((error) => {
        alert("Gagal menyimpan data: " + error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Reusable input styles
  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 outline-none bg-white text-slate-800 placeholder:text-slate-400";
  const labelClass = "block text-slate-700 font-medium mb-2 text-sm";
  const selectClass =
    "w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 outline-none bg-white text-slate-800 cursor-pointer";

  return (
    <section className="py-12 md:py-16 bg-linear-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-emerald-500/10 border border-white overflow-hidden"
          >
            {/* Form Header */}
            <div className="bg-linear-to-r from-emerald-600 via-emerald-500 to-teal-500 px-6 md:px-10 py-6 md:py-8">
              <div className="flex items-center gap-4">
                <span className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl text-2xl">
                  📋
                </span>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    Formulir Pendaftaran
                  </h2>
                  <p className="text-emerald-100 text-sm mt-1">
                    Lengkapi data di bawah dengan benar
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10 space-y-10">
              {/* ========== SECTION: DATA PRIBADI ========== */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Data Pribadi
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Nama */}
                  <div className="md:col-span-2">
                    <label className={labelClass} htmlFor="nama">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={inputClass}
                      id="nama"
                      name="nama"
                      type="text"
                      placeholder="Masukkan nama sesuai KTP"
                      required
                    />
                  </div>

                  {/* Agama */}
                  <div>
                    <label className={labelClass} htmlFor="agama">
                      Agama <span className="text-red-500">*</span>
                    </label>
                    <select
                      className={selectClass}
                      id="agama"
                      name="agama"
                      required
                    >
                      <option value="">Pilih Agama</option>
                      <option value="islam">Islam</option>
                      <option value="kristen">Kristen</option>
                      <option value="katolik">Katolik</option>
                      <option value="hindu">Hindu</option>
                      <option value="buddha">Buddha</option>
                      <option value="konghucu">Konghucu</option>
                    </select>
                  </div>

                  {/* Warga Negara */}
                  <div>
                    <label className={labelClass} htmlFor="warga_negara">
                      Warga Negara <span className="text-red-500">*</span>
                    </label>
                    <select
                      className={selectClass}
                      id="warga_negara"
                      name="warga_negara"
                      required
                    >
                      <option value="indonesia">Indonesia</option>
                      <option value="wna">Warga Negara Asing</option>
                    </select>
                  </div>

                  {/* Alamat */}
                  <div className="md:col-span-2">
                    <label className={labelClass} htmlFor="alamat">
                      Alamat <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      className={`${inputClass} resize-none`}
                      id="alamat"
                      name="alamat"
                      rows="3"
                      placeholder="Alamat lengkap sesuai KTP"
                      required
                    ></textarea>
                  </div>

                  {/* Tempat Lahir */}
                  <div>
                    <label className={labelClass} htmlFor="tempat_lahir">
                      Tempat Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={inputClass}
                      id="tempat_lahir"
                      name="tempat_lahir"
                      type="text"
                      placeholder="Kota/Kabupaten"
                      required
                    />
                  </div>

                  {/* Tanggal Lahir */}
                  <div>
                    <label className={labelClass} htmlFor="tanggal_lahir">
                      Tanggal Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={inputClass}
                      id="tanggal_lahir"
                      name="tanggal_lahir"
                      type="date"
                      required
                    />
                  </div>

                  {/* No. KTP */}
                  <div>
                    <label className={labelClass} htmlFor="nik">
                      No. KTP <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={inputClass}
                      id="nik"
                      name="nik"
                      type="text"
                      placeholder="Masukkan 16 digit nomor KTP"
                      pattern="\d{16}"
                      maxLength="16"
                      title="NIK harus 16 digit angka"
                      required
                    />
                    <p className="text-xs text-slate-500 mt-1.5">
                      Masukkan 16 digit nomor KTP
                    </p>
                  </div>

                  {/* Nomor HP */}
                  <div>
                    <label className={labelClass} htmlFor="no_hp">
                      Nomor HP <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={inputClass}
                      id="no_hp"
                      name="no_hp"
                      type="tel"
                      placeholder="Contoh: 081234567890"
                      pattern="^08[0-9]{8,11}$"
                      maxLength="13"
                      required
                    />
                    <p className="text-xs text-slate-500 mt-1.5">
                      Gunakan format nomor HP Indonesia yang valid
                    </p>
                  </div>

                  {/* Status Tempat Tinggal */}
                  <div className="md:col-span-2">
                    <label
                      className={labelClass}
                      htmlFor="status_tempat_tinggal"
                    >
                      Status Tempat Tinggal Sekarang{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      className={selectClass}
                      id="status_tempat_tinggal"
                      name="status_tempat_tinggal"
                      required
                    >
                      <option value="">Pilih Status</option>
                      <option value="milik_sendiri">Milik Sendiri</option>
                      <option value="sewa">Sewa/Kontrak</option>
                      <option value="kos">Kos</option>
                      <option value="numpang">Numpang dengan Keluarga</option>
                      <option value="dinas">Rumah Dinas</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200"></div>

              {/* ========== SECTION: ANGGOTA KELUARGA ========== */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-lg">👨‍👩‍👧‍👦</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      Anggota Keluarga
                    </h3>
                    <p className="text-sm text-slate-500">Maksimal 4 orang</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((num) => (
                    <div
                      key={num}
                      className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/50 hover:border-emerald-300 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-7 h-7 bg-emerald-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                          {num}
                        </span>
                        <h4 className="font-semibold text-slate-700">
                          Anggota {num}
                        </h4>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label
                            className={labelClass}
                            htmlFor={`anggota_${num}_nama`}
                          >
                            Nama
                          </label>
                          <input
                            className={inputClass}
                            id={`anggota_${num}_nama`}
                            name={`anggota_${num}_nama`}
                            type="text"
                            placeholder="Nama anggota keluarga"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label
                              className={labelClass}
                              htmlFor={`anggota_${num}_umur`}
                            >
                              Umur
                            </label>
                            <input
                              className={inputClass}
                              id={`anggota_${num}_umur`}
                              name={`anggota_${num}_umur`}
                              type="number"
                              min="0"
                              max="150"
                              placeholder="Tahun"
                            />
                          </div>
                          <div>
                            <label
                              className={labelClass}
                              htmlFor={`anggota_${num}_hubungan`}
                            >
                              Hubungan
                            </label>
                            <select
                              className={selectClass}
                              id={`anggota_${num}_hubungan`}
                              name={`anggota_${num}_hubungan`}
                            >
                              <option value="">Pilih</option>
                              <option value="suami">Suami</option>
                              <option value="istri">Istri</option>
                              <option value="anak">Anak</option>
                              <option value="orang_tua">Orang Tua</option>
                              <option value="mertua">Mertua</option>
                              <option value="saudara">Saudara</option>
                              <option value="lainnya">Lainnya</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label
                            className={labelClass}
                            htmlFor={`anggota_${num}_keterangan`}
                          >
                            Keterangan
                          </label>
                          <input
                            className={inputClass}
                            id={`anggota_${num}_keterangan`}
                            name={`anggota_${num}_keterangan`}
                            type="text"
                            placeholder="Keterangan tambahan"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200"></div>

              {/* ========== SECTION: STATUS PERKAWINAN ========== */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                    <span className="text-lg">💍</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Status Perkawinan
                  </h3>
                </div>

                <div className="max-w-md">
                  <label className={labelClass} htmlFor="status_perkawinan">
                    Status Perkawinan <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={selectClass}
                    id="status_perkawinan"
                    name="status_perkawinan"
                    required
                    onChange={(e) =>
                      setShowSpouseData(e.target.value === "kawin")
                    }
                  >
                    <option value="">Pilih Status</option>
                    <option value="belum_kawin">Belum Kawin</option>
                    <option value="kawin">Kawin</option>
                    <option value="cerai_hidup">Cerai Hidup</option>
                    <option value="cerai_mati">Cerai Mati</option>
                  </select>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200"></div>

              {/* ========== SECTION: DATA PEKERJAAN ========== */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <span className="text-lg">💼</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Data Pekerjaan
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Pekerjaan */}
                  <div>
                    <label className={labelClass} htmlFor="pekerjaan">
                      Pekerjaan <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={inputClass}
                      id="pekerjaan"
                      name="pekerjaan"
                      type="text"
                      placeholder="Ketik '-' jika tidak ada"
                      required
                    />
                    <p className="text-xs text-slate-500 mt-1.5">
                      Ketik '-' jika tidak ada
                    </p>
                  </div>

                  {/* Penghasilan */}
                  <div>
                    <label className={labelClass} htmlFor="penghasilan">
                      Penghasilan Rata-rata/Bulan{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={inputClass}
                      id="penghasilan"
                      name="penghasilan"
                      type="text"
                      placeholder="Ketik '0' jika tidak ada"
                      required
                    />
                    <p className="text-xs text-slate-500 mt-1.5">
                      Ketik '0' jika tidak ada
                    </p>
                  </div>

                  {/* Nama Tempat Kerja */}
                  <div>
                    <label className={labelClass} htmlFor="nama_tempat_kerja">
                      Nama Tempat Kerja
                    </label>
                    <input
                      className={inputClass}
                      id="nama_tempat_kerja"
                      name="nama_tempat_kerja"
                      type="text"
                      placeholder="Ketik '-' jika tidak ada"
                    />
                    <p className="text-xs text-slate-500 mt-1.5">
                      Ketik '-' jika tidak ada
                    </p>
                  </div>

                  {/* Alamat Pekerjaan */}
                  <div>
                    <label className={labelClass} htmlFor="alamat_pekerjaan">
                      Alamat Pekerjaan
                    </label>
                    <input
                      className={inputClass}
                      id="alamat_pekerjaan"
                      name="alamat_pekerjaan"
                      type="text"
                      placeholder="Ketik '-' jika tidak ada"
                    />
                    <p className="text-xs text-slate-500 mt-1.5">
                      Ketik '-' jika tidak ada
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200"></div>

              {/* ========== SECTION: DATA PASANGAN ========== */}
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <span className="text-lg">💑</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">
                        Data Pasangan (Suami/Istri)
                      </h3>
                      <p className="text-sm text-slate-500">*opsional</p>
                    </div>
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer bg-slate-100 px-4 py-2 rounded-xl hover:bg-slate-200 transition-colors">
                    <input
                      type="checkbox"
                      checked={showSpouseData}
                      onChange={(e) => setShowSpouseData(e.target.checked)}
                      className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Isi Data Pasangan
                    </span>
                  </label>
                </div>

                {showSpouseData && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 bg-purple-50/50 rounded-2xl border border-purple-200/50 animate-fadeIn">
                    {/* Pekerjaan Pasangan */}
                    <div>
                      <label
                        className={labelClass}
                        htmlFor="pekerjaan_pasangan"
                      >
                        Pekerjaan Istri/Suami
                      </label>
                      <input
                        className={inputClass}
                        id="pekerjaan_pasangan"
                        name="pekerjaan_pasangan"
                        type="text"
                        placeholder="Pekerjaan pasangan"
                      />
                    </div>

                    {/* Penghasilan Pasangan */}
                    <div>
                      <label
                        className={labelClass}
                        htmlFor="penghasilan_pasangan"
                      >
                        Penghasilan Istri/Suami
                      </label>
                      <input
                        className={inputClass}
                        id="penghasilan_pasangan"
                        name="penghasilan_pasangan"
                        type="text"
                        placeholder="Penghasilan rata-rata/bulan"
                      />
                    </div>

                    {/* Alamat Pekerjaan Pasangan */}
                    <div>
                      <label
                        className={labelClass}
                        htmlFor="alamat_pekerjaan_pasangan"
                      >
                        Alamat Pekerjaan Istri/Suami
                      </label>
                      <input
                        className={inputClass}
                        id="alamat_pekerjaan_pasangan"
                        name="alamat_pekerjaan_pasangan"
                        type="text"
                        placeholder="Alamat tempat kerja pasangan"
                      />
                    </div>

                    {/* NIK Pasangan */}
                    <div>
                      <label className={labelClass} htmlFor="nik_pasangan">
                        No. KTP Istri/Suami
                      </label>
                      <input
                        className={inputClass}
                        id="nik_pasangan"
                        name="nik_pasangan"
                        type="text"
                        placeholder="Masukkan 16 digit nomor KTP"
                        pattern="\d{16}"
                        maxLength="16"
                        title="NIK harus 16 digit angka"
                      />
                      <p className="text-xs text-slate-500 mt-1.5">
                        Masukkan 16 digit nomor KTP
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200"></div>

              {/* Info Box */}
              <div className="bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 md:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <span className="text-3xl">📎</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-amber-800 mb-3 text-base md:text-lg">
                      Persyaratan Dokumen
                    </h4>
                    <ul className="text-sm md:text-base text-amber-700 space-y-2">
                      {[
                        "Fotokopi KTP pemohon dan pasangan (jika sudah menikah)",
                        "Fotokopi Kartu Keluarga",
                        "Surat Keterangan Penghasilan / Slip Gaji",
                        "Surat Pernyataan belum memiliki rumah",
                        "Pas foto 3x4 berwarna (2 lembar)",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Agreement Checkbox */}
              <div className="bg-slate-50 rounded-2xl p-5">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="agreement"
                    className="w-6 h-6 mt-0.5 rounded-lg border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    required
                  />
                  <span className="text-slate-600 text-sm md:text-base leading-relaxed group-hover:text-slate-800 transition-colors">
                    Saya menyatakan bahwa data yang saya isi adalah{" "}
                    <strong>benar</strong> dan dapat dipertanggungjawabkan. Saya
                    bersedia menerima sanksi sesuai peraturan yang berlaku
                    apabila dikemudian hari ditemukan ketidaksesuaian data.
                  </span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  id="submit-form"
                  type="submit"
                  className={`flex-1 sm:flex-none px-8 md:px-12 py-4 bg-linear-to-r from-emerald-600 to-teal-600 text-white text-base font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {isSubmitting ? "Mengirim..." : "Kirim Pendaftaran"}
                </button>
                <button
                  type="reset"
                  className="flex-1 sm:flex-none px-8 md:px-12 py-4 bg-slate-200 text-slate-700 text-base font-semibold rounded-xl hover:bg-slate-300 active:scale-[0.98] transition-all duration-300"
                >
                  Reset Form
                </button>
              </div>
            </div>
          </form>

          {/* Contact Info */}
          <div className="mt-10 text-center">
            <p className="text-slate-600 mb-4 font-medium">
              Butuh bantuan? Hubungi kami:
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm">
              <a
                href="tel:+623761234567"
                className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-200 text-emerald-700 hover:text-emerald-800 hover:shadow-md hover:border-emerald-300 transition-all duration-300"
              >
                <span>📞</span> (0376) 123-456
              </a>
              <a
                href="mailto:perkim@lotim.go.id"
                className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-200 text-emerald-700 hover:text-emerald-800 hover:shadow-md hover:border-emerald-300 transition-all duration-300"
              >
                <span>✉️</span> perkim@lotim.go.id
              </a>
              <span className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-200 text-slate-600">
                <span>🏢</span> Jl. Prof. M. Yamin, Selong
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Formulir;
