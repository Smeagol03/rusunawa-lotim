import React from "react";
import { XMarkIcon, HomeIcon } from "@heroicons/react/24/outline";
import { generateUnits } from "/src/config/unitConfig";

const PilihUnitModal = ({ isOpen, onClose, onSelect, occupiedUnits = [] }) => {
  if (!isOpen) return null;

  const allUnits = generateUnits();

  // Filter available units
  const availableUnits = allUnits.filter(
    (unit) => !occupiedUnits.includes(unit.id)
  );

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-emerald-50/50">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Pilih Unit Rusun
            </h3>
            <p className="text-sm text-gray-500">
              Pilih unit yang tersedia untuk penghuni baru
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-600 shadow-sm border border-gray-100 transition-transform hover:rotate-90"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content - Grid of Units */}
        <div className="p-6 overflow-y-auto">
          {availableUnits.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <HomeIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Maaf, semua unit saat ini sedang penuh.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {availableUnits.map((unit) => (
                <button
                  key={unit.id}
                  onClick={() => onSelect(unit.id)}
                  className="group relative flex flex-col items-center justify-center p-4 rounded-xl border-2 border-emerald-100 bg-emerald-50/30 hover:bg-emerald-100 hover:border-emerald-400 transition-all duration-200"
                >
                  <HomeIcon className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-emerald-800">{unit.id}</span>
                  <span className="text-[10px] text-emerald-600 uppercase tracking-wider mt-1 font-semibold">
                    Tersedia
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-xs text-gray-500">
          <span>Total Unit: {allUnits.length}</span>
          <span>Tersedia: {availableUnits.length}</span>
        </div>
      </div>
    </div>
  );
};

export default PilihUnitModal;
