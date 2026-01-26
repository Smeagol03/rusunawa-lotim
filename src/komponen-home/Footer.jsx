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
      className="relative bg-slate-900 border-t border-slate-800 pt-20 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-emerald-500/50 to-transparent"></div>

      <div className="container mx-auto px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Branding */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-900/40">
                <BuildingOffice2Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tighter">
                  Perkim <span className="text-emerald-500">Lotim</span>
                </h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Official Portal
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs">
              Mewujudkan hunian layak, terjangkau, dan berkelanjutan bagi
              seluruh masyarakat Kabupaten Lombok Timur melalui tata kelola yang
              transparan.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all"
              >
                <GlobeAltIcon className="w-5 h-5" />
              </a>
              {/* Add other social icons if needed */}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-black text-white uppercase tracking-widest border-l-4 border-emerald-500 pl-3">
              Navigasi
            </h4>
            <ul className="space-y-3">
              {[
                "Beranda",
                "Fasilitas",
                "Cara Daftar",
                "Tentang",
                "Laporan",
              ].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "")}`}
                    className="group flex items-center gap-2 text-slate-400 hover:text-emerald-400 font-medium transition-colors"
                  >
                    <ChevronRightIcon className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-6">
            <h4 className="text-sm font-black text-white uppercase tracking-widest border-l-4 border-emerald-500 pl-3">
              Kontak Resmi
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  Jl. Raya Selong, Kompleks Perkantoran, Lombok Timur, NTB 83612
                </p>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-emerald-500 shrink-0" />
                <p className="text-slate-400 text-sm font-medium line-clamp-1">
                  (0376) 123-456
                </p>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="w-5 h-5 text-emerald-500 shrink-0" />
                <p className="text-slate-400 text-sm font-medium line-clamp-1">
                  perkim@lotim.go.id
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Operational */}
          <div className="space-y-6">
            <h4 className="text-sm font-black text-white uppercase tracking-widest border-l-4 border-emerald-500 pl-3">
              Jam Layanan
            </h4>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 space-y-4">
              <div className="flex items-start gap-3">
                <ClockIcon className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-300 uppercase">
                    Senin - Kamis
                  </p>
                  <p className="text-sm font-medium text-slate-400">
                    08:00 - 16:00 WITA
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-slate-700/50 pt-4">
                <ClockIcon className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-300 uppercase">
                    Jumat
                  </p>
                  <p className="text-sm font-medium text-slate-400">
                    08:30 - 11:30 WITA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-20 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-medium text-center md:text-left">
            © {new Date().getFullYear()} Dinas Perumahan dan Kawasan Permukiman
            Lombok Timur. Seluruh Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-slate-500 hover:text-emerald-500 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-emerald-500 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
