import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyALFtCdNp8Tgk5SEkeJgyy3XmOADYx5q0k",
    authDomain: "fir-33e0d.firebaseapp.com",
    projectId: "fir-33e0d",
    storageBucket: "fir-33e0d.appspot.com",
    messagingSenderId: "593131978609",
    appId: "1:593131978609:web:201c6656ad9fba5d7f40d0"
  };

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth =getAuth(app);
