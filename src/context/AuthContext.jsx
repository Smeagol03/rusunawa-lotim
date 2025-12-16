// Import React hooks dan fungsi-fungsi yang diperlukan
import React, { createContext, useContext, useEffect, useState } from "react";
// Import konfigurasi Firebase Auth dari file firebase.js
import { auth } from "/src/config/firebase";
// Import fungsi untuk memantau perubahan status autentikasi
import { onAuthStateChanged } from "firebase/auth";

// ============================================
// MEMBUAT CONTEXT
// ============================================
// Membuat Context untuk menyimpan data autentikasi
// Context memungkinkan kita berbagi data ke seluruh komponen tanpa props drilling
const AuthContext = createContext();

// ============================================
// CUSTOM HOOK: useAuth
// ============================================
// Hook kustom untuk mengakses AuthContext dari komponen mana saja
// Contoh penggunaan: const { currentUser } = useAuth();
export const useAuth = () => {
  return useContext(AuthContext);
};

// ============================================
// PROVIDER COMPONENT: AuthProvider
// ============================================
// Komponen Provider yang membungkus aplikasi dan menyediakan data autentikasi
// Props 'children' adalah komponen-komponen anak yang dibungkus oleh AuthProvider
export const AuthProvider = ({ children }) => {
  // State untuk menyimpan data user yang sedang login (null jika belum login)
  const [currentUser, setCurrentUser] = useState(null);
  // State untuk menandakan apakah proses pengecekan autentikasi masih berjalan
  const [loading, setLoading] = useState(true);

  // ============================================
  // useEffect: MEMANTAU STATUS AUTENTIKASI
  // ============================================
  // useEffect berjalan sekali saat komponen pertama kali dimuat (dependency array kosong [])
  useEffect(() => {
    // onAuthStateChanged adalah listener dari Firebase yang memantau perubahan status login
    // Fungsi ini akan dipanggil setiap kali:
    // - User login (user = object data user)
    // - User logout (user = null)
    // - Saat halaman pertama kali dimuat (mengecek session yang tersimpan)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Update state currentUser dengan data user dari Firebase
      setCurrentUser(user);
      // Set loading ke false karena pengecekan sudah selesai
      setLoading(false);
    });

    // Cleanup function: Menghentikan listener saat komponen di-unmount
    // Ini penting untuk mencegah memory leak
    return unsubscribe;
  }, []);

  // Object yang akan dibagikan ke seluruh komponen melalui Context
  const value = {
    currentUser, // Data user yang sedang login
  };

  // ============================================
  // RENDER PROVIDER
  // ============================================
  return (
    // AuthContext.Provider membungkus children dan menyediakan value
    <AuthContext.Provider value={value}>
      {/* Hanya render children jika loading sudah selesai (loading = false)
          Ini mencegah tampilan "flash" saat pengecekan autentikasi berlangsung */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
