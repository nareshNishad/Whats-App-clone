import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCDvH47WvD79ldNB1J6-pjaNY6O7uqFBAo",
  authDomain: "whats-app-clone-41b08.firebaseapp.com",
  databaseURL: "https://whats-app-clone-41b08.firebaseio.com",
  projectId: "whats-app-clone-41b08",
  storageBucket: "whats-app-clone-41b08.appspot.com",
  messagingSenderId: "141848036458",
  appId: "1:141848036458:web:ba302178756483e382b613",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
