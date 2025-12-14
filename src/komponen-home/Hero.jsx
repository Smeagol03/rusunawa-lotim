const Hero = () => {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-3xl py-16 flex flex-col justify-center">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-4 py-1.5 text-2xl text-gray-600 ring-1 ring-emerald-500/20 hover:ring-emerald-500/40 bg-emerald-50/50">
              🏠 Pendaftaran Rusunawa Dibuka!{" "}
              <a href="/daftar" className="font-semibold text-emerald-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Daftar sekarang <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance text-gray-900">
              Hunian Layak & Terjangkau untuk{" "}
              <span className="text-emerald-600">Keluarga Anda</span>
            </h1>
            <p className="mt-6 md:mt-8 text-sm md:text-base font-medium text-pretty text-gray-500 max-w-2xl mx-auto">
              Rumah Susun Sederhana Sewa (Rusunawa) Kabupaten Lombok Timur hadir
              menyediakan hunian yang aman, nyaman, dan terjangkau bagi
              masyarakat berpenghasilan rendah.
            </p>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
              <a
                href="/daftar"
                className="w-full sm:w-auto rounded-xl bg-emerald-600 px-6 py-3 text-sm md:text-base font-semibold text-white shadow-lg hover:bg-emerald-700 hover:shadow-xl active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>📝</span>
                Daftar Sekarang
              </a>
              <a
                href="#fasilitas"
                className="text-sm md:text-base font-semibold text-gray-900 hover:text-emerald-600 transition-colors flex items-center gap-1"
              >
                Lihat Fasilitas <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
