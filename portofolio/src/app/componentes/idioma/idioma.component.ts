import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { IdiomaService } from 'src/app/service/idioma.service';


@Component({
  selector: 'app-idioma',
  templateUrl: './idioma.component.html',
  styleUrls: ['./idioma.component.css']
})
export class IdiomaComponent implements OnInit{
 
  Idioma:any;
  editIdioma:any;
  agregarIdioma:any;
  IdiomaById:any;
  formIdioma:FormGroup;
  editarIdi: string;
  eliminarIdi: string;
  agregarIdi: string;

  constructor(public idiomaService : IdiomaService, private router:Router, private formBuilder: FormBuilder ){
    this.formIdioma = this.formBuilder.group({
      id:['',[]],
      nombre:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      img:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    const auth = getAuth();
    auth.onAuthStateChanged(user => {
      if (user) {
        this.editarIdi = "inline";
        this.eliminarIdi = "inline";
        this.agregarIdi = "inline";
      } else {
        this.editarIdi = "none";
        this.eliminarIdi = "none";
        this.agregarIdi = "none";
      }
    });
    this.GetIdioma();
  }

  GetIdioma():void{
    this.idiomaService.getIdioma().subscribe(info => {
      console.log(info);  
      this.Idioma = info;
      console.log("esta imprimiendo"); 
    });
  }

  AgregarIdioma(event : Event){
    event.preventDefault;
    console.log("agregar idioma");
    this.agregarIdioma = {
      "nombre": this.formIdioma.value.nombre,
      "descripcion": this.formIdioma.value.descripcion,
      "img": this.formIdioma.value.img,
      }
    this.idiomaService.addIdioma(this.agregarIdioma).subscribe(data => {
      console.log(data); 
    });
    setTimeout(this.recargar, 2000);
  }

  vaciarForm(){
    console.log("vaciar formulario");
    this.formIdioma.setValue({id:"",nombre:"",descripcion:"",img:""});
  }

  EliminarIdioma(){
    console.log("eliminar");
    const id = this.formIdioma.value.id;
    this.idiomaService.Eliminar(id).subscribe(data => {
       console.log(data); 
      console.log("eliminado"); 
    });
     setTimeout(this.recargar, 2000);
  }

  recargar(){ 
    location.reload();
  }

  EditarIdioma(){
    this.editIdioma = {
      "id": this.formIdioma.value.id,
      "nombre": this.formIdioma.value.nombre,
      "descripcion": this.formIdioma.value.descripcion,
      "img": this.formIdioma.value.img,
      }
    this.idiomaService.editIdioma(this.editIdioma).subscribe(data => {
      console.log("Editado"); 
    });
    setTimeout(this.recargar, 2000);
 }

  GetEditIdioma(id:number){
    this.idiomaService.getIdiomaById(id).subscribe(result => { 
      this.IdiomaById = result;
      this.formIdioma.setValue({
        id:this.IdiomaById.id,
        nombre:this.IdiomaById.nombre,
        descripcion:this.IdiomaById.descripcion,
        img:this.IdiomaById.img
      });
    });
  }

}
