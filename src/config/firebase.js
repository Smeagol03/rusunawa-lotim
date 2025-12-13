import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAOhjEc7CCKLLrEsHOAcPAorYHLwC667VQ",
  authDomain: "rusunawalotim.firebaseapp.com",
  databaseURL:
    "https://rusunawalotim-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rusunawalotim",
  storageBucket: "rusunawalotim.firebasestorage.app",
  messagingSenderId: "992215679452",
  appId: "1:992215679452:web:67e8976c48085dbd914f19",
  measurementId: "G-81D2BKFF0G",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
