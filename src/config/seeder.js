import { simpanPendaftar } from "./database";

const firstNames = [
  "Budi",
  "Siti",
  "Agus",
  "Ratna",
  "Dewi",
  "Bambang",
  "Rina",
  "Eko",
  "Wati",
  "Joko",
  "Sri",
  "Andi",
  "Nina",
  "Dedi",
];
const lastNames = [
  "Santoso",
  "Wijaya",
  "Saputra",
  "Utami",
  "Kusuma",
  "Hidayat",
  "Sari",
  "Pratama",
  "Lestari",
  "Nugroho",
  "Wibowo",
  "Yulia",
];

const jobs = [
  "Pedagang",
  "Buruh",
  "Karyawan Swasta",
  "Wiraswasta",
  "Driver Ojol",
  "Petani",
  "Guru Honorer",
  "Nelayan",
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const seedDummyPendaftar = async (count = 5) => {
  const promises = [];

  for (let i = 0; i < count; i++) {
    const firstName = getRandom(firstNames);
    const lastName = getRandom(lastNames);
    const fullName = `${firstName} ${lastName}`;

    // Generate Random NIK (16 digit)
    // 5203 (Lotim) + random
    const nik =
      "5203" +
      Math.floor(Math.random() * 1000000000000)
        .toString()
        .padStart(12, "0");

    const data = {
      nama: fullName,
      nik: nik,
      no_hp:
        "08" +
        Math.floor(Math.random() * 10000000000)
          .toString()
          .padStart(10, "0"),
      agama: getRandom(["islam", "kristen", "hindu"]),
      warga_negara: "indonesia",
      tempat_lahir: "Lombok Timur",
      tanggal_lahir: `${getRandomInt(1980, 2000)}-${getRandomInt(1, 12)
        .toString()
        .padStart(2, "0")}-${getRandomInt(1, 28).toString().padStart(2, "0")}`,
      alamat: `Dusun ${getRandom([
        "Mekar",
        "Sari",
        "Maju",
        "Jaya",
      ])}, Desa ${getRandom(["Selong", "Pancor", "Masbagik", "Aikmel"])}`,
      status_tempat_tinggal: getRandom(["sewa", "kos", "numpang"]),

      // Pekerjaan
      pekerjaan: getRandom(jobs),
      penghasilan: getRandomInt(1500000, 4500000),
      nama_tempat_kerja: "-",
      alamat_pekerjaan: "-",

      // Status
      status_perkawinan: getRandom(["belum_kawin", "kawin", "cerai_hidup"]),
    };

    // Add spouse if married
    if (data.status_perkawinan === "kawin") {
      data.nama_pasangan = `${getRandom(firstNames)} ${getRandom(lastNames)}`;
      data.nik_pasangan =
        "5203" +
        Math.floor(Math.random() * 1000000000000)
          .toString()
          .padStart(12, "0");
      data.pekerjaan_pasangan = getRandom(jobs);
      data.penghasilan_pasangan = getRandomInt(1000000, 3000000);
      data.alamat_pekerjaan_pasangan = "-";
    }

    // Add family mebers (random 0-3)
    const numFamily = getRandomInt(0, 3);
    const family = [];
    for (let f = 0; f < numFamily; f++) {
      family.push({
        nama: `${getRandom(firstNames)} ${getRandom(lastNames)}`,
        umur: getRandomInt(1, 15),
        hubungan: "anak",
        keterangan: "sekolah",
      });
    }
    data.anggotaKeluarga = family;

    promises.push(simpanPendaftar(data));
  }

  return Promise.all(promises);
};
