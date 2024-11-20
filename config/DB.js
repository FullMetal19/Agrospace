import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from "firebase/database";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyA4qsfmLXMYu3ZZ-v-dd_B2Gi1FH-36rWQ",
    authDomain: "agrospace-a86a1.firebaseapp.com",
    projectId: "agrospace-a86a1",
    storageBucket: "agrospace-a86a1.firebasestorage.app",
    messagingSenderId: "9636413951",
    appId: "1:9636413951:web:11a416ed108911b4b4e7ca",
    measurementId: "G-82KE183NTF"
  };

const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const rdb = getDatabase(app);

export default app;
