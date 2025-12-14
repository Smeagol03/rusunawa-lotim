import * as XLSX from "xlsx";

/**
 * Export data ke file Excel (.xlsx)
 * @param {Array} data - Array of objects to export
 * @param {Array} columns - Column definitions [{key, label, width?}]
 * @param {string} filename - Nama file tanpa extension
 * @param {string} sheetName - Nama sheet (default: "Data")
 */
export const exportToExcel = (data, columns, filename, sheetName = "Data") => {
  // Transform data sesuai kolom yang dipilih
  const exportData = data.map((item) => {
    const row = {};
    columns.forEach((col) => {
      row[col.label] = item[col.key] ?? "-";
    });
    return row;
  });

  // Buat worksheet
  const ws = XLSX.utils.json_to_sheet(exportData);

  // Set column widths
  const colWidths = columns.map((col) => ({
    wch: col.width || 15,
  }));
  ws["!cols"] = colWidths;

  // Buat workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  // Generate filename dengan tanggal
  const date = new Date().toISOString().slice(0, 10);
  const fullFilename = `${filename}_${date}.xlsx`;

  // Download file
  XLSX.writeFile(wb, fullFilename);
};

/**
 * Kolom untuk export Penghuni (SEMUA DATA)
 */
export const PENGHUNI_COLUMNS = [
  // Data Utama
  { key: "nama", label: "Nama Lengkap", width: 25 },
  { key: "nik", label: "NIK", width: 20 },
  { key: "nomor_unit", label: "Unit", width: 10 },
  { key: "no_hp", label: "No. HP", width: 15 },
  { key: "status", label: "Status", width: 12 },
  { key: "tanggal_masuk", label: "Tanggal Masuk", width: 18 },
  // Data Pribadi
  { key: "agama", label: "Agama", width: 12 },
  { key: "warga_negara", label: "Warga Negara", width: 15 },
  { key: "status_tempat_tinggal", label: "Status Tempat Tinggal", width: 20 },
  { key: "alamat", label: "Alamat", width: 35 },
  // Data Pernikahan
  { key: "status_pernikahan", label: "Status Pernikahan", width: 18 },
  // Data Pekerjaan
  { key: "jenis_pekerjaan", label: "Jenis Pekerjaan", width: 18 },
  { key: "tempat_kerja", label: "Tempat Kerja", width: 25 },
  { key: "alamat_pekerjaan", label: "Alamat Pekerjaan", width: 30 },
  { key: "penghasilan", label: "Penghasilan", width: 15 },
  // Data Pasangan
  { key: "nama_pasangan", label: "Nama Pasangan", width: 25 },
  { key: "nik_pasangan", label: "NIK Pasangan", width: 20 },
  { key: "jenis_pekerjaan_pasangan", label: "Pekerjaan Pasangan", width: 18 },
  { key: "penghasilan_pasangan", label: "Penghasilan Pasangan", width: 18 },
  // Anggota Keluarga 1
  { key: "anggota_1_nama", label: "Anggota 1 - Nama", width: 20 },
  { key: "anggota_1_umur", label: "Anggota 1 - Umur", width: 10 },
  { key: "anggota_1_hubungan", label: "Anggota 1 - Hubungan", width: 15 },
  { key: "anggota_1_keterangan", label: "Anggota 1 - Keterangan", width: 15 },
  // Anggota Keluarga 2
  { key: "anggota_2_nama", label: "Anggota 2 - Nama", width: 20 },
  { key: "anggota_2_umur", label: "Anggota 2 - Umur", width: 10 },
  { key: "anggota_2_hubungan", label: "Anggota 2 - Hubungan", width: 15 },
  { key: "anggota_2_keterangan", label: "Anggota 2 - Keterangan", width: 15 },
  // Anggota Keluarga 3
  { key: "anggota_3_nama", label: "Anggota 3 - Nama", width: 20 },
  { key: "anggota_3_umur", label: "Anggota 3 - Umur", width: 10 },
  { key: "anggota_3_hubungan", label: "Anggota 3 - Hubungan", width: 15 },
  { key: "anggota_3_keterangan", label: "Anggota 3 - Keterangan", width: 15 },
  // Anggota Keluarga 4
  { key: "anggota_4_nama", label: "Anggota 4 - Nama", width: 20 },
  { key: "anggota_4_umur", label: "Anggota 4 - Umur", width: 10 },
  { key: "anggota_4_hubungan", label: "Anggota 4 - Hubungan", width: 15 },
  { key: "anggota_4_keterangan", label: "Anggota 4 - Keterangan", width: 15 },
  // Tanggal
  { key: "tanggal_daftar", label: "Tanggal Daftar", width: 18 },
];

/**
 * Kolom untuk export Pendaftar (SEMUA DATA)
 */
export const PENDAFTAR_COLUMNS = [
  // Data Utama
  { key: "nama", label: "Nama Lengkap", width: 25 },
  { key: "nik", label: "NIK", width: 20 },
  { key: "no_hp", label: "No. HP", width: 15 },
  { key: "status", label: "Status", width: 15 },
  { key: "tanggal_daftar", label: "Tanggal Daftar", width: 18 },
  // Data Pribadi
  { key: "agama", label: "Agama", width: 12 },
  { key: "warga_negara", label: "Warga Negara", width: 15 },
  { key: "status_tempat_tinggal", label: "Status Tempat Tinggal", width: 20 },
  { key: "alamat", label: "Alamat", width: 35 },
  // Data Pernikahan
  { key: "status_pernikahan", label: "Status Pernikahan", width: 18 },
  // Data Pekerjaan
  { key: "jenis_pekerjaan", label: "Jenis Pekerjaan", width: 18 },
  { key: "tempat_kerja", label: "Tempat Kerja", width: 25 },
  { key: "alamat_pekerjaan", label: "Alamat Pekerjaan", width: 30 },
  { key: "penghasilan", label: "Penghasilan", width: 15 },
  // Data Pasangan
  { key: "nama_pasangan", label: "Nama Pasangan", width: 25 },
  { key: "nik_pasangan", label: "NIK Pasangan", width: 20 },
  { key: "jenis_pekerjaan_pasangan", label: "Pekerjaan Pasangan", width: 18 },
  { key: "penghasilan_pasangan", label: "Penghasilan Pasangan", width: 18 },
  // Anggota Keluarga 1
  { key: "anggota_1_nama", label: "Anggota 1 - Nama", width: 20 },
  { key: "anggota_1_umur", label: "Anggota 1 - Umur", width: 10 },
  { key: "anggota_1_hubungan", label: "Anggota 1 - Hubungan", width: 15 },
  { key: "anggota_1_keterangan", label: "Anggota 1 - Keterangan", width: 15 },
  // Anggota Keluarga 2
  { key: "anggota_2_nama", label: "Anggota 2 - Nama", width: 20 },
  { key: "anggota_2_umur", label: "Anggota 2 - Umur", width: 10 },
  { key: "anggota_2_hubungan", label: "Anggota 2 - Hubungan", width: 15 },
  { key: "anggota_2_keterangan", label: "Anggota 2 - Keterangan", width: 15 },
  // Anggota Keluarga 3
  { key: "anggota_3_nama", label: "Anggota 3 - Nama", width: 20 },
  { key: "anggota_3_umur", label: "Anggota 3 - Umur", width: 10 },
  { key: "anggota_3_hubungan", label: "Anggota 3 - Hubungan", width: 15 },
  { key: "anggota_3_keterangan", label: "Anggota 3 - Keterangan", width: 15 },
  // Anggota Keluarga 4
  { key: "anggota_4_nama", label: "Anggota 4 - Nama", width: 20 },
  { key: "anggota_4_umur", label: "Anggota 4 - Umur", width: 10 },
  { key: "anggota_4_hubungan", label: "Anggota 4 - Hubungan", width: 15 },
  { key: "anggota_4_keterangan", label: "Anggota 4 - Keterangan", width: 15 },
];

/**
 * Kolom untuk export Log Aktivitas (SEMUA DATA)
 */
export const AKTIVITAS_COLUMNS = [
  { key: "pesan", label: "Aktivitas", width: 50 },
  { key: "tipe", label: "Tipe", width: 15 },
  { key: "timestamp", label: "Waktu", width: 20 },
  { key: "dibaca", label: "Status Dibaca", width: 12 },
];

/**
 * Format tanggal untuk export
 */
export const formatDateForExport = (dateString) => {
  if (!dateString) return "-";
  try {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

/**
 * Format data sebelum export
 */
export const prepareDataForExport = (data, type) => {
  return data.map((item) => {
    const formatted = { ...item };

    // Format tanggal
    if (type === "penghuni") {
      formatted.tanggal_masuk = formatDateForExport(item.tanggal_masuk);
      formatted.tanggal_daftar = formatDateForExport(item.tanggal_daftar);
    } else if (type === "pendaftar") {
      formatted.tanggal_daftar = formatDateForExport(item.tanggal_daftar);
    } else if (type === "aktivitas") {
      formatted.timestamp = formatDateForExport(item.timestamp);
      formatted.dibaca = item.dibaca ? "Sudah Dibaca" : "Belum Dibaca";
    }

    // Flatten anggotaKeluarga array to separate columns for mail merge
    if (type === "penghuni" || type === "pendaftar") {
      const keluarga = item.anggotaKeluarga || [];
      for (let i = 0; i < 4; i++) {
        const member = keluarga[i] || {};
        formatted[`anggota_${i + 1}_nama`] = member.nama || "-";
        formatted[`anggota_${i + 1}_umur`] = member.umur || "-";
        formatted[`anggota_${i + 1}_hubungan`] = member.hubungan || "-";
        formatted[`anggota_${i + 1}_keterangan`] = member.keterangan || "-";
      }
    }

    return formatted;
  });
};
