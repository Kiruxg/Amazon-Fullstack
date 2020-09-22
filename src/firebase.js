import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDErkq3kQDAVSavtYDtLabV6szjXeXBjPo",
  authDomain: "clone-9f846.firebaseapp.com",
  databaseURL: "https://clone-9f846.firebaseio.com",
  projectId: "clone-9f846",
  storageBucket: "clone-9f846.appspot.com",
  messagingSenderId: "455397434684",
  appId: "1:455397434684:web:828aac70017fb959672a39",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore(); //get access to db

const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth };
