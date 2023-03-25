import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import "firebase/auth";


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcw2XZRLUl3uK1p1UhZCdEODtV5B_Foaw",
  authDomain: "portfolio-df72c.firebaseapp.com",
  projectId: "portfolio-df72c",
  storageBucket: "portfolio-df72c.appspot.com",
  messagingSenderId: "778524298476",
  appId: "1:778524298476:web:ad499ef2fcc30d2750a9c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
