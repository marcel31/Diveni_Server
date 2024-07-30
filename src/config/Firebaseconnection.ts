/* eslint-disable @typescript-eslint/naming-convention */
import admin from "firebase-admin";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import serviceAccount from './diveni.json' assert {type: 'json'};

const account = serviceAccount as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(account),
  databaseURL: "https://diveni-e73be-default-rtdb.europe-west1.firebasedatabase.app"
});

const firebaseConfig = {
  apiKey: "AIzaSyAR3zhbelx7stTajKGZhBaDvBq289QcAv8",
  authDomain: "diveni-e73be.firebaseapp.com",
  databaseURL: "https://diveni-e73be-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "diveni-e73be",
  storageBucket: "diveni-e73be.appspot.com",
  messagingSenderId: "468420706356",
  appId: "1:468420706356:web:030182b3a43d8ed70d8a61",
  measurementId: "G-SVYJH1V6R5"
};

const app = initializeApp(firebaseConfig);
const db = admin.firestore();
const auth = getAuth(app);

export { admin, db, auth };