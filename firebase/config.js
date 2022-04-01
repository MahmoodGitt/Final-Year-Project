// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCDpuw2NBGxAgw72zJDHwWM9C0myPk5HFk',
	authDomain: 'final-year-project-673f2.firebaseapp.com',
	databaseURL: 'https://final-year-project-673f2-default-rtdb.firebaseio.com',
	projectId: 'final-year-project-673f2',
	storageBucket: 'final-year-project-673f2.appspot.com',
	messagingSenderId: '286405843926',
	appId: '1:286405843926:web:a04d9cb7207292d6a7a277',
	// measurementId: 'G-C0RF1KE9LN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;
