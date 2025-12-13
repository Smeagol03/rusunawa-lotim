import React, { useEffect, useState } from "react";
import {
  listenToPenghuni,
  hapusPenghuni,
  updateDataPenghuni,
} from "/src/config/database";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import DetailModal from "/src/components/admin/DetailModal";

const KelolaPenghuni = () => {
  const [penghuni, setPenghuni] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const unsubscribe = listenToPenghuni((data) => {
      setPenghuni(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Format date readable
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const openDetail = (data) => {
    setSelectedData(data);
    setIsEditing(false); // Default view mode
    setIsModalOpen(true);
  };

  const openEdit = (data) => {
    setSelectedData(data);
    setIsEditing(true); // Edit mode
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
    setIsEditing(false);
  };

  const handleSave = async (newData) => {
    try {
      await updateDataPenghuni(newData.nik, newData);
      alert("Data berhasil diperbarui!");
      closeModal();
    } catch (error) {
      console.error("Gagal update:", error);
      alert("Gagal menyimpan perubahan: " + error.message);
    }
  };

  const handleHapus = async (data) => {
    if (
      window.confirm(
        `Yakin ingin menghapus ${data.nama}? Data akan dipindah ke Keranjang Sampah dan Unit akan dikosongkan.`
      )
    ) {
      try {
        await hapusPenghuni(data);
        alert("Penghuni berhasil dihapus (Soft Delete).");
      } catch (error) {
        console.error(error);
        alert("Gagal menghapus: " + error.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Daftar Penghuni</h1>
        <span className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
          Total: {penghuni.length}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-800 font-semibold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Nama Lengkap</th>
                <th className="px-6 py-4">NIK</th>
                <th className="px-6 py-4">Unit</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Memuat data penghuni...
                  </td>
                </tr>
              ) : penghuni.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Belum ada data penghuni.
                  </td>
                </tr>
              ) : (
                penghuni.map((item) => (
                  <tr
                    key={item.nik}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.nama}
                    </td>
                    <td className="px-6 py-4">{item.nik}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">
                      {item.nomor_unit || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-semibold">
                        Aktif
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center space-x-2">
                      {/* Lihat Detail */}
                      <button
                        onClick={() => openDetail(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Lihat Detail"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => openEdit(item)}
                        className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit Data"
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>

                      {/* Hapus */}
                      <button
                        onClick={() => handleHapus(item)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={selectedData}
        title="Detail Penghuni"
        isEditing={isEditing}
        onSave={handleSave}
        occupiedUnits={penghuni.map((p) => p.nomor_unit).filter(Boolean)} // Calculate and pass occupied units
      />
    </div>
  );
};

export default KelolaPenghuni;
