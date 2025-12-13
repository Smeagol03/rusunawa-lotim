import React, { useEffect, useState } from "react";
import {
  listenToPendaftar,
  listenToPenghuni, // Import listener for tenants
  verifikasiPendaftar,
  pindahkanKeSampah,
} from "/src/config/database";
import {
  EyeIcon,
  CheckCircleIcon,
  TrashIcon,
  PlusCircleIcon, // New Icon
} from "@heroicons/react/24/outline";
import DetailModal from "../../components/admin/DetailModal";
import PilihUnitModal from "../../components/admin/PilihUnitModal"; // Import Modal
import { seedDummyPendaftar } from "/src/config/seeder"; // Import Seeder

const KelolaPendaftar = () => {
  const [pendaftar, setPendaftar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false); // Loading state for seeder

  // Track Occupied Units
  const [occupiedUnits, setOccupiedUnits] = useState([]);

  // Modal State
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Unit Selection Modal State
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [pendaftarToVerify, setPendaftarToVerify] = useState(null); // Data user yang akan diverifikasi

  useEffect(() => {
    // 1. Listen to Pendaftar
    const unsubscribePendaftar = listenToPendaftar((data) => {
      setPendaftar(data);
      setLoading(false);
    });

    // 2. Listen to Penghuni (to filter occupied units)
    const unsubscribePenghuni = listenToPenghuni((data) => {
      const occupied = data.map((p) => p.nomor_unit).filter(Boolean);
      setOccupiedUnits(occupied);
    });

    return () => {
      unsubscribePendaftar();
      unsubscribePenghuni();
    };
  }, []);

  const handleSeedData = async () => {
    setSeeding(true);
    try {
      await seedDummyPendaftar(5);
      alert("Berhasil membuat 5 data pendaftar dummy!");
    } catch (e) {
      alert("Gagal seed: " + e.message);
    } finally {
      setSeeding(false);
    }
  };

  // Triggered when clicking "Verifikasi" button
  const handleVerifikasiClick = (data) => {
    setPendaftarToVerify(data);
    setIsUnitModalOpen(true);
  };

  // Triggered when a unit is selected from the modal
  const handleUnitSelected = async (unitId) => {
    if (!pendaftarToVerify) return;

    if (
      window.confirm(
        `Konfirmasi: Verifikasi ${pendaftarToVerify.nama} ke Unit ${unitId}?`
      )
    ) {
      try {
        await verifikasiPendaftar(pendaftarToVerify, unitId);
        alert(
          `Berhasil! ${pendaftarToVerify.nama} telah resmi menjadi penghuni Unit ${unitId}.`
        );
        setIsUnitModalOpen(false);
        setPendaftarToVerify(null);
        closeModal(); // Close detail modal if open
      } catch (error) {
        console.error(error);
        alert("Gagal memverifikasi: " + error.message);
      }
    }
  };

  const handleHapus = async (data) => {
    if (
      window.confirm(
        `Yakin ingin menghapus ${data.nama}? Data akan dipindah ke Sampah.`
      )
    ) {
      try {
        await pindahkanKeSampah(data);
        alert("Data berhasil dipindah ke sampah.");
      } catch (error) {
        console.error(error);
        alert("Gagal menghapus: " + error.message);
      }
    }
  };

  const openDetail = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Kelola Pendaftar
          </h1>
          <div className="flex gap-2 mt-1">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              Total: {pendaftar.length}
            </span>
            {/* DEV BUTTON */}
            <button
              onClick={handleSeedData}
              disabled={seeding}
              className="flex items-center gap-1 text-xs bg-gray-600 text-white px-3 py-1 rounded-full hover:bg-gray-700 transition"
            >
              <PlusCircleIcon className="w-3 h-3" />
              {seeding ? "Generating..." : "Generate Dummy Data"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-800 font-semibold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Nama Lengkap</th>
                <th className="px-6 py-4">NIK</th>
                <th className="px-6 py-4">No. HP</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Memuat data...
                  </td>
                </tr>
              ) : pendaftar.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Belum ada data pendaftar.
                  </td>
                </tr>
              ) : (
                pendaftar.map((item) => (
                  <tr
                    key={item.nik}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.nama}
                    </td>
                    <td className="px-6 py-4">{item.nik}</td>
                    <td className="px-6 py-4">{item.no_hp}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          item.status === "terverifikasi"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status === "terverifikasi"
                          ? "Terverifikasi"
                          : "Menunggu"}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center space-x-2">
                      <button
                        onClick={() => openDetail(item)}
                        title="Detail"
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>

                      {item.status !== "terverifikasi" && (
                        <button
                          onClick={() => handleVerifikasiClick(item)} // OPEN MODAL
                          title="Verifikasi"
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <CheckCircleIcon className="w-5 h-5" />
                        </button>
                      )}

                      <button
                        onClick={() => handleHapus(item)}
                        title="Hapus"
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
        title="Detail Pendaftar"
        actions={
          selectedData?.status !== "terverifikasi" && (
            <button
              onClick={() => {
                handleVerifikasiClick(selectedData); // OPEN MODAL from Detail too
                // Do NOT close detail modal immediately, wait for selection
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-200"
            >
              Verifikasi Sekarang
            </button>
          )
        }
      />

      {/* Unit Selection Modal */}
      <PilihUnitModal
        isOpen={isUnitModalOpen}
        onClose={() => setIsUnitModalOpen(false)}
        onSelect={handleUnitSelected}
        occupiedUnits={occupiedUnits}
      />
    </div>
  );
};

export default KelolaPendaftar;
