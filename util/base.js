import Rebase from "re-base";
import firebase from "firebase";

let firebaseApp;

if (firebase.apps && firebase.apps.length > 0) {
  firebaseApp = firebase.apps[0];
} else {
  firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDF-5x-OouZ8-2yR6BO0IaZ4W3ZsG0ZVsM",
    authDomain: "catch-of-the-day-vetri.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-vetri.firebaseio.com"
  });
}

const base = Rebase.createClass(firebase.database());

export { firebaseApp };

export default base;
