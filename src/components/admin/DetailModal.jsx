import React, { useState, useEffect } from "react";
import {
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import PilihUnitModal from "./PilihUnitModal";

// Helper Component defined OUTSIDE to prevent re-renders losing focus
const RenderField = ({
  label,
  name,
  value,
  type = "text",
  fullWidth = false,
  isEditing,
  onChange,
  options = null,
}) => (
  <div className={fullWidth ? "col-span-2" : ""}>
    <span className="block text-gray-500 text-xs mb-1">{label}</span>
    {isEditing ? (
      options ? (
        <select
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full text-sm border-b border-gray-300 focus:border-emerald-500 outline-none py-1 bg-gray-50/50"
        >
          <option value="">- Pilih -</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full text-sm border-b border-gray-300 focus:border-emerald-500 outline-none py-1 bg-gray-50/50"
        />
      )
    ) : (
      <span className="font-medium text-gray-900 wrap-break-word">
        {value || "-"}
      </span>
    )}
  </div>
);

const DetailModal = ({
  isOpen,
  onClose,
  data,
  title = "Detail Data",
  actions,
  isEditing = false,
  onSave,
  occupiedUnits = [], // Prop for filtering
}) => {
  if (!isOpen || !data) return null;

  const [formData, setFormData] = useState(data);
  const [isUnitPickerOpen, setIsUnitPickerOpen] = useState(false); // Unit picker state

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for Family Members
  const handleFamilyChange = (index, field, value) => {
    const newFamily = [...(formData.anggotaKeluarga || [])];
    newFamily[index] = { ...newFamily[index], [field]: value };
    setFormData((prev) => ({ ...prev, anggotaKeluarga: newFamily }));
  };

  const addFamilyMember = () => {
    setFormData((prev) => ({
      ...prev,
      anggotaKeluarga: [
        ...(prev.anggotaKeluarga || []),
        { nama: "", umur: "", hubungan: "", keterangan: "" },
      ],
    }));
  };

  const removeFamilyMember = (index) => {
    const newFamily = [...(formData.anggotaKeluarga || [])];
    newFamily.splice(index, 1);
    setFormData((prev) => ({ ...prev, anggotaKeluarga: newFamily }));
  };

  const handleSave = () => {
    if (onSave) onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-xl font-bold text-gray-800">
            {isEditing ? "Edit Data" : title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-8">
          {/* --- DATA PRIBADI --- */}
          <div>
            <h4 className="text-sm font-bold text-emerald-600 uppercase tracking-wide mb-3 border-b border-emerald-100 pb-2">
              Data Pribadi
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <RenderField
                label="Nama Lengkap"
                name="nama"
                value={formData.nama}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <RenderField
                label="NIK"
                name="nik"
                value={formData.nik}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <RenderField
                label="Tempat Lahir"
                name="tempat_lahir"
                value={formData.tempat_lahir}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <RenderField
                label="Tanggal Lahir"
                name="tanggal_lahir"
                value={formData.tanggal_lahir}
                type="date"
                isEditing={isEditing}
                onChange={handleChange}
              />

              <RenderField
                label="Agama"
                name="agama"
                value={formData.agama}
                isEditing={isEditing}
                onChange={handleChange}
                options={[
                  { label: "Islam", value: "islam" },
                  { label: "Kristen", value: "kristen" },
                  { label: "Katolik", value: "katolik" },
                  { label: "Hindu", value: "hindu" },
                  { label: "Buddha", value: "buddha" },
                  { label: "Konghucu", value: "konghucu" },
                ]}
              />

              <RenderField
                label="Warga Negara"
                name="warga_negara"
                value={formData.warga_negara}
                isEditing={isEditing}
                onChange={handleChange}
                options={[
                  { label: "Indonesia", value: "indonesia" },
                  { label: "WNA", value: "wna" },
                ]}
              />

              <RenderField
                label="No. HP"
                name="no_hp"
                value={formData.no_hp}
                isEditing={isEditing}
                onChange={handleChange}
              />

              <RenderField
                label="Status Tempat Tinggal"
                name="status_tempat_tinggal"
                value={formData.status_tempat_tinggal}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <RenderField
                label="Status Perkawinan"
                name="status_perkawinan"
                value={formData.status_perkawinan}
                isEditing={isEditing}
                onChange={handleChange}
                options={[
                  { label: "Belum Kawin", value: "belum_kawin" },
                  { label: "Kawin", value: "kawin" },
                  { label: "Cerai Hidup", value: "cerai_hidup" },
                  { label: "Cerai Mati", value: "cerai_mati" },
                ]}
              />

              <RenderField
                label="Alamat KTP"
                name="alamat"
                value={formData.alamat}
                fullWidth
                isEditing={isEditing}
                onChange={handleChange}
              />

              {/* Unit Editing (Custom UI for Unit Picker) */}
              {formData.nomor_unit && (
                <div className="">
                  <span className="block text-gray-500 text-xs mb-1">
                    Nomor Unit (Admin)
                  </span>
                  {isEditing ? (
                    <button
                      onClick={() => setIsUnitPickerOpen(true)}
                      className="w-full text-left text-sm border-b border-gray-300 py-1 bg-emerald-50 text-emerald-800 font-medium flex items-center justify-between hover:bg-emerald-100 transition"
                    >
                      <span>{formData.nomor_unit}</span>
                      <span className="text-[10px] bg-emerald-200 px-2 rounded text-emerald-800">
                        Ubah
                      </span>
                    </button>
                  ) : (
                    <span className="font-medium text-gray-900">
                      {formData.nomor_unit}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* --- DATA PEKERJAAN --- */}
          <div>
            <h4 className="text-sm font-bold text-amber-600 uppercase tracking-wide mb-3 border-b border-amber-100 pb-2">
              Data Pekerjaan
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <RenderField
                label="Pekerjaan"
                name="pekerjaan"
                value={formData.pekerjaan}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <RenderField
                label="Penghasilan"
                name="penghasilan"
                value={formData.penghasilan}
                type="number"
                isEditing={isEditing}
                onChange={handleChange}
              />
              <RenderField
                label="Nama Tempat Kerja"
                name="nama_tempat_kerja"
                value={formData.nama_tempat_kerja}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <RenderField
                label="Alamat Tempat Kerja"
                name="alamat_pekerjaan"
                value={formData.alamat_pekerjaan}
                isEditing={isEditing}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* --- DATA PASANGAN --- */}
          {(formData.status_perkawinan === "kawin" || isEditing) && (
            <div>
              <h4 className="text-sm font-bold text-purple-600 uppercase tracking-wide mb-3 border-b border-purple-100 pb-2">
                Data Pasangan
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <RenderField
                  label="Nama Pasangan"
                  name="nama_pasangan"
                  value={formData.nama_pasangan}
                  isEditing={isEditing}
                  onChange={handleChange}
                />{" "}
                {/* Assuming name might be needed/stored even if not strictly in form? Checking form... No nama_pasangan explicitly in form, only job/nik? Wait, form doesn't seem to have name. Just Job, Income, Address, NIK. keeping consistent with form. */}
                <RenderField
                  label="NIK Pasangan"
                  name="nik_pasangan"
                  value={formData.nik_pasangan}
                  isEditing={isEditing}
                  onChange={handleChange}
                />
                <RenderField
                  label="Pekerjaan Pasangan"
                  name="pekerjaan_pasangan"
                  value={formData.pekerjaan_pasangan}
                  isEditing={isEditing}
                  onChange={handleChange}
                />
                <RenderField
                  label="Penghasilan Pasangan"
                  name="penghasilan_pasangan"
                  value={formData.penghasilan_pasangan}
                  type="number"
                  isEditing={isEditing}
                  onChange={handleChange}
                />
                <RenderField
                  label="Alamat Kerja Pasangan"
                  name="alamat_pekerjaan_pasangan"
                  value={formData.alamat_pekerjaan_pasangan}
                  isEditing={isEditing}
                  onChange={handleChange}
                  fullWidth
                />
              </div>
            </div>
          )}

          {/* --- ANGGOTA KELUARGA --- */}
          <div>
            <div className="flex justify-between items-center mb-3 border-b border-blue-100 pb-2">
              <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wide">
                Anggota Keluarga
              </h4>
              {isEditing && (
                <button
                  onClick={addFamilyMember}
                  className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded"
                >
                  <PlusIcon className="w-3 h-3" /> Tambah
                </button>
              )}
            </div>

            <div className="space-y-3">
              {/* Header for list */}
              <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-400 px-2">
                <div className="col-span-4">Nama</div>
                <div className="col-span-2">Umur</div>
                <div className="col-span-3">Hubungan</div>
                <div className="col-span-3">Keterangan</div>
              </div>

              {(formData.anggotaKeluarga || []).map((anggota, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-2 items-center bg-gray-50 p-2 rounded-lg border border-gray-100 text-sm"
                >
                  {isEditing ? (
                    <>
                      <input
                        className="col-span-4 p-1 border rounded text-xs"
                        placeholder="Nama"
                        value={anggota.nama}
                        onChange={(e) =>
                          handleFamilyChange(idx, "nama", e.target.value)
                        }
                      />
                      <input
                        className="col-span-2 p-1 border rounded text-xs"
                        placeholder="Umur"
                        type="number"
                        value={anggota.umur}
                        onChange={(e) =>
                          handleFamilyChange(idx, "umur", e.target.value)
                        }
                      />
                      <select
                        className="col-span-3 p-1 border rounded text-xs"
                        value={anggota.hubungan}
                        onChange={(e) =>
                          handleFamilyChange(idx, "hubungan", e.target.value)
                        }
                      >
                        <option value="">-Status-</option>
                        <option value="suami">Suami</option>
                        <option value="istri">Istri</option>
                        <option value="anak">Anak</option>
                        <option value="orang_tua">Orang Tua</option>
                        <option value="mertua">Mertua</option>
                        <option value="saudara">Saudara</option>
                        <option value="lainnya">Lainnya</option>
                      </select>
                      <div className="col-span-3 flex gap-1">
                        <input
                          className="w-full p-1 border rounded text-xs"
                          placeholder="Ket"
                          value={anggota.keterangan}
                          onChange={(e) =>
                            handleFamilyChange(
                              idx,
                              "keterangan",
                              e.target.value
                            )
                          }
                        />
                        <button
                          onClick={() => removeFamilyMember(idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-span-4 font-medium">
                        {anggota.nama}
                      </div>
                      <div className="col-span-2">{anggota.umur} thn</div>
                      <div className="col-span-3 italic text-gray-500">
                        {anggota.hubungan}
                      </div>
                      <div className="col-span-3 text-gray-500">
                        {anggota.keterangan || "-"}
                      </div>
                    </>
                  )}
                </div>
              ))}

              {(!formData.anggotaKeluarga ||
                formData.anggotaKeluarga.length === 0) && (
                <p className="text-center text-gray-400 text-xs py-4">
                  Tidak ada data anggota keluarga
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            {isEditing ? "Batal" : "Tutup"}
          </button>

          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-200"
            >
              Simpan Perubahan
            </button>
          ) : (
            actions
          )}
        </div>
      </div>

      {/* Nested Unit Picker Modal */}
      {isEditing && (
        <PilihUnitModal
          isOpen={isUnitPickerOpen}
          onClose={() => setIsUnitPickerOpen(false)}
          occupiedUnits={occupiedUnits.filter((u) => u !== formData.nomor_unit)} // Exclude current user's unit so they can "keep" it (but picker logic handles "available" only, so actually if I filter out MY unit from OCCUPIED list, it will show up as AVAILABLE in green, which is correct because "I" am occupying it and can choose to stay)
          onSelect={(unitId) => {
            setFormData((prev) => ({ ...prev, nomor_unit: unitId }));
            setIsUnitPickerOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default DetailModal;
