import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  
  formlogin:FormGroup;
  Usuario:any;

  constructor(private router:Router, private formBuilder : FormBuilder){
    this.formlogin = this.formBuilder.group({
      usuario:['',[Validators.required]],
      contra:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("logueado");
        // ...
      } else {
        // User is signed out
        console.log("log out");
        // ...
      }
    });
  }

  Login(){
    const auth = getAuth();
    console.log(this.formlogin); 
    this.Usuario = {
      "usuario": this.formlogin.value.usuario,
      "contra": this.formlogin.value.contra,
      }
      signInWithEmailAndPassword(auth, this.formlogin.value.usuario, this.formlogin.value.contra)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("logueado");
        // ...
      })
      .catch((error) => {
        console.log("error login");
        const errorCode = error.code;
        const errorMessage = error.message;
      }); 
 }

 Logout(){
  const auth = getAuth();
  console.log("log out"); 
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("log out");
  }).catch((error) => {
    // An error happened.
    console.log("error logout");
  });
}
}

