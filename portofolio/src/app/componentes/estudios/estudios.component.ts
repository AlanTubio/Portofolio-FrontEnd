import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudioService } from 'src/app/service/estudio.service';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit{
  
  Estudio:any;
  editEstudio:any;
  agregarEstudio:any;
  EstudioById:any;
  formEstudio:FormGroup;

  constructor(public estudioService : EstudioService, private router:Router, private formBuilder: FormBuilder ){
    this.formEstudio = this.formBuilder.group({
      id:['',[]],
      nombre:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      img:['',[Validators.required]],
      periodo_inicio:['',[Validators.required]],
      periodo_fin:['',[Validators.required]]
    })
  }
  
  ngOnInit(): void {
    this.GetEstudio();
  }
 
  GetEstudio():void{
    this.estudioService.getEstudio().subscribe(data => {
      console.log(data); 
      this.Estudio = data;
    });
  }

  AgregarEstudio(event : Event){
    event.preventDefault;
    console.log("agregar exp");
    this.agregarEstudio = {
      "nombre": this.formEstudio.value.nombre,
      "descripcion": this.formEstudio.value.descripcion,
      "img": this.formEstudio.value.img,
      "periodo_inicio": this.formEstudio.value.periodo_inicio,
      "periodo_fin": this.formEstudio.value.periodo_fin,
      }
    this.estudioService.addEstudio(this.agregarEstudio).subscribe(data => {
      console.log(data); 
    });
    location.reload();
  }

  vaciarForm(){
    console.log("vaciar formulario");
    this.formEstudio.setValue({id:"",nombre:"",descripcion:"",img:"",periodo_inicio:"",periodo_fin:""});
  }

  EliminarEstudio(){
    const id = this.formEstudio.value.id;
    this.estudioService.Eliminar(id).subscribe(data => {
      console.log(data); 
    });
    location.reload();
  }

  EditarEstudio(){
    this.editEstudio = {
      "id": this.formEstudio.value.id,
      "nombre": this.formEstudio.value.nombre,
      "descripcion": this.formEstudio.value.descripcion,
      "img": this.formEstudio.value.img,
      "periodo_inicio": this.formEstudio.value.periodo_inicio,
      "periodo_fin": this.formEstudio.value.periodo_fin,
      }
    this.estudioService.editEstudio(this.editEstudio).subscribe(data => {
      console.log("Editado"); 
    });
    location. reload();
 }

  GetEditEstudio(id:number){
    this.estudioService.getEstudioById(id).subscribe(result => { 
      this.EstudioById = result;
      this.formEstudio.setValue({
        id:this.EstudioById.id,
        nombre:this.EstudioById.nombre,
        descripcion:this.EstudioById.descripcion,
        img:this.EstudioById.img,
        periodo_inicio:this.EstudioById.periodo_inicio,
        periodo_fin:this.EstudioById.periodo_fin
      });
    });
  }

}
