import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(public idiomaService : IdiomaService, private router:Router, private formBuilder: FormBuilder ){
    this.formIdioma = this.formBuilder.group({
      id:['',[]],
      nombre:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      img:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.GetIdioma();
  }

  GetIdioma():void{
    this.idiomaService.getIdioma().subscribe(info => {
      console.log(info); 
      this.Idioma = info;
    });
  }

  AgregarIdioma(event : Event){
    event.preventDefault;
    console.log("agregar exp");
    this.agregarIdioma = {
      "nombre": this.formIdioma.value.nombre,
      "descripcion": this.formIdioma.value.descripcion,
      "img": this.formIdioma.value.img,
      }
    this.idiomaService.addIdioma(this.agregarIdioma).subscribe(data => {
      console.log(data); 
    });
    location.reload();
  }

  vaciarForm(){
    console.log("vaciar formulario");
    this.formIdioma.setValue({id:"",nombre:"",descripcion:"",img:""});
  }

  EliminarIdioma(){
    const id = this.formIdioma.value.id;
    this.idiomaService.Eliminar(id).subscribe(data => {
      console.log(data); 
    });
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
    location. reload();
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
