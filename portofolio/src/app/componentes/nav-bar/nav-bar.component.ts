import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { NavBarService } from 'src/app/service/nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  formlogin: FormGroup;
  Usuario: any;
  resultado!: string;
  resultado2: string;

  constructor(private router: Router, private formBuilder: FormBuilder, private navbarService: NavBarService) {
    this.formlogin = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.email]],
      contra: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    const auth = getAuth();
    const loginLink = document.querySelectorAll<HTMLElement>('.loginb');
    const logoutLink = document.querySelectorAll<HTMLElement>('.logout');
    const buttonEditar = document.querySelectorAll<HTMLElement>('.editar');
    const buttonEliminiar = document.querySelectorAll<HTMLElement>('.eliminar');
    

    auth.onAuthStateChanged(user => {

      if (user) {
        console.log("Esta logueado");
        logoutLink.forEach(link => link.style.display = 'block');
        loginLink.forEach(link => link.style.display = 'none');
        buttonEditar.forEach(link => link.style.display = 'block');
        buttonEliminiar.forEach(link => link.style.display = 'block');
      } else {
        console.log("No esta logueado");
        logoutLink.forEach(link => link.style.display = 'none');
        loginLink.forEach(link => link.style.display = 'block');
        buttonEditar.forEach(link => link.style.display = 'none');
        buttonEliminiar.forEach(link => link.style.display = 'none');
      }
    });
  }

  Login() {
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
        this.resultado = "";
        this.resultado2 = "Esta logueado correctamente!";
        location.reload();
        // ...
      })
      .catch((error) => {
        console.log("error login");
        const errorCode = error.code;
        const errorMessage = error.message;
        this.resultado = "El usuario o la contraseña es incorrecto!";
        this.resultado2 = "";
      });
  }

  Logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("log out");
    }).catch((error) => {
      // An error happened.
      console.log("error logout");
    });
  }/**/
}

