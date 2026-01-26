import React, { useState } from "react";
import { simpanPendaftar } from "/src/config/database";
import {
  UserIcon,
  MapPinIcon,
  IdentificationIcon,
  PhoneIcon,
  UserGroupIcon,
  BriefcaseIcon,
  HeartIcon,
  DocumentCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

// Sanitasi input for XSS
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

const sanitizeFormData = (data) => {
  const sanitized = {};
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === "object" ? sanitizeFormData(item) : sanitizeInput(item),
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
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nama: "",
    agama: "",
    warga_negara: "indonesia",
    alamat: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    nik: "",
    no_hp: "",
    status_tempat_tinggal: "",
    status_perkawinan: "",
    pekerjaan: "",
    penghasilan: "",
    nama_tempat_kerja: "",
    alamat_pekerjaan: "",
    anggotaKeluarga: [],
    nik_pasangan: "",
    pekerjaan_pasangan: "",
    penghasilan_pasangan: "",
    agreement: false,
  });

  const nextStep = () => {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length === 0) {
      setStep(step + 1);
      setErrors({});
    } else {
      setErrors(stepErrors);
    }
  };

  const prevStep = () => setStep(step - 1);

  const validateStep = (currentStep) => {
    let newErrors = {};
    if (currentStep === 1) {
      if (!formData.nama) newErrors.nama = "Nama lengkap wajib diisi";
      if (!formData.nik || formData.nik.length !== 16)
        newErrors.nik = "NIK harus 16 digit";
      if (!formData.no_hp) newErrors.no_hp = "Nomor HP wajib diisi";
      if (!formData.alamat) newErrors.alamat = "Alamat wajib diisi";
    } else if (currentStep === 3) {
      if (!formData.pekerjaan) newErrors.pekerjaan = "Pekerjaan wajib diisi";
      if (!formData.penghasilan)
        newErrors.penghasilan = "Penghasilan wajib diisi";
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreement) {
      alert("Anda harus menyetujui pernyataan kebenaran data.");
      return;
    }

    setIsSubmitting(true);
    const sanitizedData = sanitizeFormData(formData);

    try {
      await simpanPendaftar(sanitizedData);
      setStep(5); // Success step
    } catch (error) {
      alert("Gagal menyimpan data: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (name) => `
    w-full px-4 py-3.5 rounded-2xl bg-slate-50 border transition-all duration-300
    ${errors[name] ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"}
    text-slate-900 font-medium placeholder:text-slate-400 outline-none
  `;

  const labelClass = "block text-sm font-bold text-slate-700 mb-2 ml-1";

  return (
    <section className="relative py-24 lg:py-32 bg-slate-50/50 min-h-screen overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent"></div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          {step < 5 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    Formulir{" "}
                    <span className="text-emerald-600">Pendaftaran</span>
                  </h2>
                  <p className="text-slate-500 font-medium mt-1">
                    Lengkapi data untuk mengajukan hunian Rusunawa
                  </p>
                </div>
                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
                  <span className="text-sm font-black text-slate-900">
                    Langkah {step} <span className="text-slate-400">/ 4</span>
                  </span>
                </div>
              </div>

              <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-linear-to-r from-emerald-500 to-teal-400 transition-all duration-700 ease-out"
                  style={{ width: `${(step / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Form Content */}
          <div className="bg-white rounded-[40px] shadow-2xl shadow-emerald-900/5 border border-white p-8 md:p-12">
            {step === 1 && (
              <div className="space-y-8 animate-fadeIn">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                    <UserIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    Data Identitas Diri
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className={labelClass}>
                      Nama Lengkap Sesuai KTP
                    </label>
                    <input
                      name="nama"
                      value={formData.nama}
                      onChange={handleInputChange}
                      className={inputClass("nama")}
                      placeholder="Nama Lengkap"
                    />
                    {errors.nama && (
                      <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                        <ExclamationCircleIcon className="w-4 h-4" />
                        {errors.nama}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>NIK (16 Digit)</label>
                    <input
                      name="nik"
                      value={formData.nik}
                      onChange={handleInputChange}
                      maxLength="16"
                      className={inputClass("nik")}
                      placeholder="0000000000000000"
                    />
                    {errors.nik && (
                      <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                        <ExclamationCircleIcon className="w-4 h-4" />
                        {errors.nik}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>Nomor HP / WhatsApp</label>
                    <input
                      name="no_hp"
                      value={formData.no_hp}
                      onChange={handleInputChange}
                      className={inputClass("no_hp")}
                      placeholder="081234567890"
                    />
                    {errors.no_hp && (
                      <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                        <ExclamationCircleIcon className="w-4 h-4" />
                        {errors.no_hp}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClass}>Alamat Lengkap</label>
                    <textarea
                      name="alamat"
                      value={formData.alamat}
                      onChange={handleInputChange}
                      rows="3"
                      className={inputClass("alamat")}
                      placeholder="Isi alamat lengkap sesuai domisili"
                    ></textarea>
                    {errors.alamat && (
                      <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                        <ExclamationCircleIcon className="w-4 h-4" />
                        {errors.alamat}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-fadeIn">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-teal-50 rounded-2xl text-teal-600">
                    <UserGroupIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    Data Keluarga & Kelahiran
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Tempat Lahir</label>
                    <input
                      name="tempat_lahir"
                      value={formData.tempat_lahir}
                      onChange={handleInputChange}
                      className={inputClass()}
                      placeholder="Kota/Kabupaten"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Tanggal Lahir</label>
                    <input
                      name="tanggal_lahir"
                      value={formData.tanggal_lahir}
                      onChange={handleInputChange}
                      type="date"
                      className={inputClass()}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Agama</label>
                    <select
                      name="agama"
                      value={formData.agama}
                      onChange={handleInputChange}
                      className={inputClass()}
                    >
                      <option value="">Pilih Agama</option>
                      <option value="islam">Islam</option>
                      <option value="kristen">Kristen</option>
                      <option value="katolik">Katolik</option>
                      <option value="hindu">Hindu</option>
                      <option value="buddha">Buddha</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Status Tempat Tinggal</label>
                    <select
                      name="status_tempat_tinggal"
                      value={formData.status_tempat_tinggal}
                      onChange={handleInputChange}
                      className={inputClass()}
                    >
                      <option value="">Pilih Status</option>
                      <option value="sewa">Sewa / Kontrak</option>
                      <option value="numpang">Numpang Keluarga</option>
                      <option value="milik">Milik Sendiri</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-fadeIn">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                    <BriefcaseIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    Informasi Pekerjaan
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Pekerjaan Utama</label>
                    <input
                      name="pekerjaan"
                      value={formData.pekerjaan}
                      onChange={handleInputChange}
                      className={inputClass("pekerjaan")}
                      placeholder="Contoh: Karyawan Swasta"
                    />
                    {errors.pekerjaan && (
                      <p className="text-red-500 text-xs mt-2">
                        {errors.pekerjaan}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Penghasilan Per Bulan</label>
                    <input
                      name="penghasilan"
                      value={formData.penghasilan}
                      onChange={handleInputChange}
                      className={inputClass("penghasilan")}
                      placeholder="Contoh: 3,000,000"
                    />
                    {errors.penghasilan && (
                      <p className="text-red-500 text-xs mt-2">
                        {errors.penghasilan}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>
                      Nama Instansi / Tempat Kerja
                    </label>
                    <input
                      name="nama_tempat_kerja"
                      value={formData.nama_tempat_kerja}
                      onChange={handleInputChange}
                      className={inputClass()}
                      placeholder="Nama Perusahaan atau Instansi"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8 animate-fadeIn text-center">
                <div className="flex flex-col items-center gap-4 py-8">
                  <div className="p-5 bg-indigo-50 rounded-full text-indigo-600 mb-4 scale-150">
                    <DocumentCheckIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Konfirmasi Akhir
                  </h3>
                  <p className="text-slate-500 font-medium max-w-sm">
                    Mohon periksa kembali data Anda sebelum mengirimkan formulir
                    ini.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-3xl p-8 text-left border border-slate-100 flex items-start gap-4">
                  <input
                    type="checkbox"
                    id="agreement"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={handleInputChange}
                    className="w-6 h-6 rounded-lg text-emerald-600 focus:ring-emerald-500 border-slate-300 mt-1"
                  />
                  <label
                    htmlFor="agreement"
                    className="text-sm font-semibold text-slate-700 leading-relaxed cursor-pointer"
                  >
                    Saya menyatakan bahwa data yang saya isi adalah benar dan
                    dapat dipertanggungjawabkan. Saya bersedia menerima sanksi
                    apabila di kemudian hari ditemukan ketidaksesuaian data.
                  </label>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow-2xl shadow-emerald-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Kirim Pendaftaran Berkas{" "}
                      <CheckCircleIcon className="w-6 h-6" />
                    </>
                  )}
                </button>
              </div>
            )}

            {step === 5 && (
              <div className="py-12 text-center animate-fadeIn">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircleIcon className="w-16 h-16 text-emerald-600" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">
                  Pendaftaran Terkirim!
                </h3>
                <p className="text-slate-600 text-lg font-medium max-w-md mx-auto mb-10 leading-relaxed">
                  Terima kasih atas pendaftaran Anda. Tim admin kami akan
                  melakukan verifikasi berkas dalam 3-5 hari kerja.
                </p>
                <button
                  onClick={() => (window.location.href = "/")}
                  className="px-10 py-4 bg-slate-100 text-slate-900 font-black rounded-2xl hover:bg-slate-200 transition-colors"
                >
                  Kembali ke Beranda
                </button>
              </div>
            )}

            {/* Step Navigation */}
            {step < 4 && (
              <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-10">
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`flex items-center gap-2 px-6 py-3 font-bold rounded-2xl transition-all ${step === 1 ? "opacity-0 pointer-events-none" : "text-slate-500 hover:bg-slate-100"}`}
                >
                  <ArrowLeftIcon className="w-5 h-5" /> Sebelumnya
                </button>
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-10 py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Lanjut <ArrowRightIcon className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Contact Support */}
          {step < 5 && (
            <div className="mt-12 text-center">
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3">
                <PhoneIcon className="w-4 h-4" /> Bantuan Teknis: (0376) 123-456
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Formulir;
