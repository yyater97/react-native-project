import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBwf8oIjaBrLfIPh_qRQ56zTg9znBZm7Yw",
    authDomain: "busmap.firebaseapp.com",
    databaseURL: "https://busmap.firebaseio.com",
    projectId: "busmap",
    storageBucket: "busmap.appspot.com",
    messagingSenderId: "141048970339"
  };
  
export const firebaseApp = firebase.initializeApp(config);