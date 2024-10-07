import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyC3RJbslvvhn75vKWLyHVcFbUWkoV9Mnhg",
  authDomain: "weather-app-f1217.firebaseapp.com",
  projectId: "weather-app-f1217",
  storageBucket: "weather-app-f1217.appspot.com",
  messagingSenderId: "887102852615",
  appId: "1:887102852615:web:90db09a088e962bf3724a2"
};

let db, functions;
export async function init() {
  initializeApp(firebaseConfig);
  db = getFirestore();
  functions = getFunctions();
  if (__DEV__) {
    connectFirestoreEmulator(db, "localhost", 8080);
    connectFunctionsEmulator(functions, "localhost", 5001);
  }
}

init();
export { db, functions };
