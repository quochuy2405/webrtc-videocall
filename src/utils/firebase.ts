import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCWo1Esj22l97An3e4lyjeEPJxWjrEWjK0",
	authDomain: "rtc-web-15f4b.firebaseapp.com",
	databaseURL: "https://rtc-web-15f4b-default-rtdb.firebaseio.com/",
	projectId: "rtc-web-15f4b",
	storageBucket: "rtc-web-15f4b.appspot.com",
	messagingSenderId: "196388121406",
	appId: "1:196388121406:web:ffcbdf602c5bef65459a6f",
	measurementId: "G-EM13DNM8VL", // This is optional, only if you are using Firebase analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app) as any;
