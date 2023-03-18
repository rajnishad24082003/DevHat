import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcwZwnmeJ3xDLWzLTYDlYAYSt8oHHBrzs",
  authDomain: "hospital2-f7433.firebaseapp.com",
  projectId: "hospital2-f7433",
  storageBucket: "hospital2-f7433.appspot.com",
  messagingSenderId: "984625487827",
  appId: "1:984625487827:web:bc3da974cd314e028ad926",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
