import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer
      id="kontak"
      className="relative bg-slate-900 pt-24 pb-12 overflow-hidden"
    >
      {/* Decorative Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-white to-transparent opacity-5"></div>

      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Column 1: Branding & Philosophy */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-600 rounded-[20px] flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                <img
                  src="https://rusunawadaftar.vercel.app/src/asset/img/Lambang_Kabupaten_Lombok_Timur.png"
                  alt="Logo Lombok Timur"
                />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white leading-none tracking-tighter">
                  PERKIM LOTIM
                </h3>
              </div>
            </div>

            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Mewujudkan hunian yang inklusif, berkelanjutan, dan bermartabat
              melalui transformasi digital pelayanan publik di Kabupaten Lombok
              Timur.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all transform hover:-translate-y-1"
              >
                <GlobeAltIcon className="w-5 h-5" />
              </a>
              {/* Other social icons can be added here */}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-8">
            <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest px-4 py-1.5 border border-emerald-500/30 rounded-full inline-block">
              Navigasi Cepat
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Beranda", href: "/" },
                { name: "Unit & Fasilitas", href: "/#fasilitas" },
                { name: "Alur Pendaftaran", href: "/#caradaftar" },
                { name: "Tentang Kami", href: "/#tentang" },
                { name: "Laporan Keluhan", href: "/#laporan" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-slate-400 hover:text-emerald-400 font-bold text-sm transition-all"
                  >
                    <ChevronRightIcon className="w-4 h-4 text-emerald-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-8">
            <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest px-4 py-1.5 border border-emerald-500/30 rounded-full inline-block">
              Hubungi Kami
            </h4>
            <div className="space-y-6">
              <div className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-900/50 transition-colors">
                  <MapPinIcon className="w-5 h-5 text-emerald-500" />
                </div>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  Jl. Raya Selong, Kompleks Perkantoran Pemerintah Daerah,
                  Selong, Lombok Timur, 83612
                </p>
              </div>
              <div className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-900/50 transition-colors">
                  <PhoneIcon className="w-5 h-5 text-emerald-500" />
                </div>
                <p className="text-slate-400 text-sm font-bold">
                  (0376) 123-456
                </p>
              </div>
              <div className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-900/50 transition-colors">
                  <EnvelopeIcon className="w-5 h-5 text-emerald-500" />
                </div>
                <p className="text-slate-400 text-sm font-bold">
                  perkim@lotimkab.go.id
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Operational Hours */}
          <div className="space-y-8">
            <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest px-4 py-1.5 border border-emerald-500/30 rounded-full inline-block">
              Waktu Operasional
            </h4>
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-[32px] p-8 border border-slate-700/50 space-y-6">
              <div className="flex items-start gap-4">
                <ClockIcon className="w-6 h-6 text-emerald-500 mt-1" />
                <div className="space-y-1">
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
                    Senin - Kamis
                  </p>
                  <p className="text-lg font-black text-white">08:00 - 16:00</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">
                    Waktu Indonesia Tengah
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-700/50 flex items-start gap-4">
                <ClockIcon className="w-6 h-6 text-teal-500 mt-1" />
                <div className="space-y-1">
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
                    Jumat
                  </p>
                  <p className="text-lg font-black text-white">08:30 - 11:30</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-20 pt-12 border-t border-slate-800/80 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="text-center lg:text-left space-y-2">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} Dinas PERKIM Kabupaten Lombok Timur
            </p>
            <p className="text-[10px] text-slate-600 font-medium">
              Sistem Informasi Manajemen Rusunawa Terintegrasi (SIMR-T)
            </p>
          </div>

          <div className="flex items-center gap-10">
            <a
              href="#"
              className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-emerald-500 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-emerald-500 transition-colors"
            >
              Term of Service
            </a>
            <a
              href="#"
              className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-emerald-500 transition-colors"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
