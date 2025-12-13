import React from "react";

const Laporan = () => {
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
        <form id="laporan-form" className="space-y-4">
          <div>
            <label htmlFor="nama" className="sr-only">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              placeholder="Nama"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
              placeholder="No HP WhatsApp (rekomendasi)"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          <div>
            <label htmlFor="laporan" className="sr-only">
              Laporan
            </label>
            <textarea
              id="laporan"
              name="laporan"
              placeholder="Laporan"
              rows="4"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition transform hover:scale-105"
          >
            Kirim
          </button>
        </form>
      </div>
    </section>
  );
};

export default Laporan;
