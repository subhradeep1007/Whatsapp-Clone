import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDFkliCtSTefGdAjKCkDYe-FTxSSE2kazk",
  authDomain: "stproj-560e2.firebaseapp.com",
  projectId: "stproj-560e2",
  storageBucket: "stproj-560e2.appspot.com",
  messagingSenderId: "818090257585",
  appId: "1:818090257585:web:1a79f09d612b4082d70690"
};

  const firebaseapp=firebase.initializeApp(firebaseConfig);
  const db = firebaseapp.firestore()
  const auth= firebaseapp.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  export {auth,provider}
  export default db