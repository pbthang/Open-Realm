import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBup0DsWCLRUpgELgO6kL6NC0CAX3J2zdw",
  authDomain: "open-realm-c7b70.firebaseapp.com",
  projectId: "open-realm-c7b70",
  storageBucket: "open-realm-c7b70.appspot.com",
  messagingSenderId: "942986798387",
  appId: "1:942986798387:web:093ead94f6c5706c590a46",
  measurementId: "G-D3FS73J2BD",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
