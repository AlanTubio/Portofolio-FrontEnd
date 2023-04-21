import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { ProyectosService } from 'src/app/service/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit{
  
  Proyecto:any;
  editProyecto:any;
  agregarProyecto:any;
  ProyectoById:any;
  formProyecto:FormGroup;
  editarProy: string;
  eliminarProy: string;
  agregarProy: string;

  constructor(public proyectoService : ProyectosService, private router:Router, private formBuilder: FormBuilder ){
    this.formProyecto = this.formBuilder.group({
      id:['',[]],
      nombre:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      img:['',[Validators.required]],
      link:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    const auth = getAuth();
    auth.onAuthStateChanged(user => {
      if (user) {
        this.editarProy = "inline";
        this.eliminarProy = "inline";
        this.agregarProy = "inline";
      } else {
        this.editarProy = "none";
        this.eliminarProy = "none";
        this.agregarProy = "none";
      }
    });
    this.GetProyecto();
  }
 
  GetProyecto():void{
    this.proyectoService.getProyecto().subscribe(data => {
      console.log(data); 
      this.Proyecto = data;
    });
  }

  AgregarProyecto(event : Event){
    event.preventDefault;
    console.log("agregar");
    this.agregarProyecto = {
      "nombre": this.formProyecto.value.nombre,
      "descripcion": this.formProyecto.value.descripcion,
      "img": this.formProyecto.value.img,
      "link": this.formProyecto.value.link,
      }
    this.proyectoService.addProyecto(this.agregarProyecto).subscribe(data => {
      console.log(data); 
    });
    setTimeout(this.recargar, 2000);
  }

  vaciarForm(){
    console.log("vaciar formulario");
    this.formProyecto.setValue({id:"",nombre:"",descripcion:"",img:"",link:""});
  }

  EliminarProyecto(){
    const id = this.formProyecto.value.id;
    this.proyectoService.Eliminar(id).subscribe(data => {
      console.log(data); 
    });
    setTimeout(this.recargar, 2000);
  }

  recargar(){ 
    location.reload();
  }

  EditarProyecto(){
    this.editProyecto = {
      "id": this.formProyecto.value.id,
      "nombre": this.formProyecto.value.nombre,
      "descripcion": this.formProyecto.value.descripcion,
      "img": this.formProyecto.value.img,
      "link": this.formProyecto.value.link,
      }
    this.proyectoService.editProyecto(this.editProyecto).subscribe(data => {
      console.log("Editado");
      location.reload(); 
    });
 }

  GetEditProyecto(id:number){
    this.proyectoService.getProyectoById(id).subscribe(result => { 
      this.ProyectoById = result;
      this.formProyecto.setValue({
        id:this.ProyectoById.id,
        nombre:this.ProyectoById.nombre,
        descripcion:this.ProyectoById.descripcion,
        img:this.ProyectoById.img,
        link:this.ProyectoById.link
      });
    });
  }

}
