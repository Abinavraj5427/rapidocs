import firebase from "firebase";

var admin = require("firebase-admin");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7OyCDw_y55CzB6DQ7YZ0qx-5M2Lel3wc",
  authDomain: "rapidocs-118c3.firebaseapp.com",
  databaseURL: "https://rapidocs-118c3.firebaseio.com",
  projectId: "rapidocs-118c3",
  storageBucket: "rapidocs-118c3.appspot.com",
  messagingSenderId: "991408888934",
  appId: "1:991408888934:web:9b31fa8d0573c741d5e1a7",
  measurementId: "G-XZPRX2ZW9G",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.database();

// const auth = firebaseApp.auth();

export default db;
