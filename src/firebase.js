import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClJsFMqINphQhwspJUvg-A2cP4C8XhLts",
  authDomain: "personalbudget-dc049.firebaseapp.com",
  projectId: "personalbudget-dc049",
  storageBucket: "personalbudget-dc049.appspot.com",
  messagingSenderId: "298230967216",
  appId: "1:298230967216:android:5694cf0f5f338cdd4f8475"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
