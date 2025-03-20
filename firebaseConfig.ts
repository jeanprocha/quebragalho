import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC2buHr7E5d8VMqH_Xd1JdzPkn_hDb1DqE",
    authDomain: "quebragalhoapp-ad0a9.firebaseapp.com",
    projectId: "quebragalhoapp-ad0a9",
    storageBucket: "quebragalhoapp-ad0a9.firebasestorage.app",
    messagingSenderId: "762139883302",
    appId: "1:762139883302:web:d64fb062a55e72a3d973e7",
    measurementId: "G-42318G9Z3Z"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
