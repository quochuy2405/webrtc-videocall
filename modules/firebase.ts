import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAD6JB0uLp_0HQW7uGcGzVInR9WfQqhqgY",
  authDomain: "callvideo-76bd2.firebaseapp.com",
  databaseURL: "https://callvideo-76bd2-default-rtdb.firebaseio.com",
  projectId: "callvideo-76bd2",
  storageBucket: "callvideo-76bd2.appspot.com",
  messagingSenderId: "87550672815",
  appId: "1:87550672815:web:92d3c39a3295ef5898395a",
  measurementId: "G-H4DBXQFCGV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app) as any;
