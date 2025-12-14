import React, { useState, useEffect } from "react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

/**
 * Modal konfirmasi berlapis untuk aksi berbahaya
 * Memerlukan user mengetik kata konfirmasi sebelum eksekusi
 */
const KonfirmasiModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Konfirmasi Hapus Permanen",
  message = "Tindakan ini tidak dapat dibatalkan!",
  confirmWord = "KONFIRMASI",
  itemCount = 0,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [step, setStep] = useState(1); // 1 = first confirm, 2 = type confirmation

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setInputValue("");
      setStep(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFirstConfirm = () => {
    setStep(2);
  };

  const handleFinalConfirm = () => {
    if (inputValue === confirmWord) {
      onConfirm();
      onClose();
    }
  };

  const isConfirmDisabled = inputValue !== confirmWord;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-fadeIn">
        {/* Header - Red danger theme */}
        <div className="bg-linear-to-r from-red-600 to-red-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <ExclamationTriangleIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-white/70 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {step === 1 ? (
            /* Step 1: First confirmation */
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Yakin ingin menghapus {itemCount} data?
              </h4>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700 text-sm font-medium">
                  ⚠️ PERINGATAN: Data yang dihapus permanen TIDAK DAPAT
                  dikembalikan!
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
                >
                  Batal
                </button>
                <button
                  onClick={handleFirstConfirm}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                >
                  Ya, Lanjutkan
                </button>
              </div>
            </div>
          ) : (
            /* Step 2: Type confirmation word */
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-2 text-center">
                Konfirmasi Final
              </h4>
              <p className="text-gray-600 text-center mb-4">
                Ketik{" "}
                <span className="font-bold text-red-600">{confirmWord}</span>{" "}
                untuk menghapus permanen {itemCount} data.
              </p>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                placeholder={`Ketik ${confirmWord} di sini...`}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-center text-lg font-medium focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                autoFocus
              />
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
                >
                  Kembali
                </button>
                <button
                  onClick={handleFinalConfirm}
                  disabled={isConfirmDisabled}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition ${
                    isConfirmDisabled
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  Hapus Permanen
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KonfirmasiModal;
