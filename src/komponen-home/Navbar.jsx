import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const navigation = [
    { name: "Beranda", href: "/" },
    { name: "Fasilitas", href: "/#fasilitas" },
    { name: "Cara Daftar", href: "/#caradaftar" },
    { name: "Tentang", href: "/#tentang" },
    { name: "Kontak", href: "#kontak" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-md shadow-lg border-b border-white/20 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a
            href="/"
            className="-m-1.5 p-1.5 flex items-center gap-3 group transition-all duration-300"
          >
            <span className="sr-only">PERKIM LOTIM</span>
            <div className="relative">
              <img
                alt="Logo Lombok Timur"
                src="/logo.png"
                className="h-10 w-auto drop-shadow-md group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span
              className={`text-xl font-black tracking-tight transition-colors duration-300 ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              PERKIM <span className="text-emerald-600">LOTIM</span>
            </span>
          </a>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className={`-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5 transition-colors ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full hover:bg-emerald-50 hover:text-emerald-700 group ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="/login"
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-linear-to-r from-emerald-600 to-teal-600 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Login Admin
          </a>
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm transition-opacity" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-slate-900/10 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <span className="sr-only">PERKIM LOTIM</span>
              <img
                alt=""
                src="https://rusunawadaftar.vercel.app/src/asset/img/Lambang_Kabupaten_Lombok_Timur.png"
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-slate-900">
                PERKIM <span className="text-emerald-600">LOTIM</span>
              </span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-xl p-2.5 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-8 flow-root">
            <div className="-my-6 divide-y divide-slate-100">
              <div className="space-y-3 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6 pt-8">
                <a
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 px-4 py-4 text-base font-bold text-white shadow-lg shadow-emerald-100 active:scale-95 transition-all"
                >
                  Login Admin
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
