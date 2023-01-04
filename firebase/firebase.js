const firebaseApp = firebase.initializeApp({
apiKey: "AIzaSyATHBn8NJPGr8VF0_LLgjqpmEbNAsHlnG4",
authDomain: "todo-list-ef9ec.firebaseapp.com",
projectId: "todo-list-ef9ec",
storageBucket: "todo-list-ef9ec.appspot.com",
messagingSenderId: "389186591387",
appId: "1:389186591387:web:0e87e7daa3ae5b1091443e",
measurementId: "G-78CKQB0ZNN"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

