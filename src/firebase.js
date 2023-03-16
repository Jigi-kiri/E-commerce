import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB-427S3yR7Cm2MNrso1mNNJpHvO9BubD0",
  authDomain: "e-commers-86644.firebaseapp.com",
  projectId: "e-commers-86644",
  storageBucket: "e-commers-86644.appspot.com",
  messagingSenderId: "556338042067",
  appId: "1:556338042067:web:218e3f917a97a4da3f7026",
  measurementId: "G-7YYPTKLQDP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;