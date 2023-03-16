import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css']
})
export class ExperienciasComponent implements OnInit{
  
  Experiencia:any;
  Experiencia2:any;
  edit:any;
  agregar:any;
  ExperienciaById:any;
  formexp:FormGroup;
  
  constructor(public experienciaService : ExperienciaService, private router:Router, private formBuilder: FormBuilder ){
    this.formexp = this.formBuilder.group({
      id:['',[]],
      nombre:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      img:['',[Validators.required]],
      periodo_inicio:['',[Validators.required]],
      periodo_fin:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.GetExperiencia();
    AOS.init()
    window.addEventListener('load', AOS.refresh)
  }

  GetExperiencia():void{
    this.experienciaService.getExperiencia().subscribe(data => {
      console.log(data); 
      this.Experiencia = data;
    });
  }

  Agregarexp(event : Event){
    event.preventDefault;
    console.log("agregar exp");
    this.agregar = {
      "nombre": this.formexp.value.nombre,
      "descripcion": this.formexp.value.descripcion,
      "img": this.formexp.value.img,
      "periodo_inicio": this.formexp.value.periodo_inicio,
      "periodo_fin": this.formexp.value.periodo_fin,
      }
    this.experienciaService.addExperiencia(this.agregar).subscribe(data => {
      console.log(data); 
    });
    location.reload();
  }

  vaciarForm(){
    console.log("vaciar formulario");
    this.formexp.setValue({id:"",nombre:"",descripcion:"",img:"",periodo_inicio:"",periodo_fin:""});
  }

  Eliminarexp(){
    const id = this.formexp.value.id;
    this.experienciaService.Eliminar(id).subscribe(data => {
      console.log(data); 
    });
    location.reload();
  }

  Editarexp(){
    this.edit = {
      "id": this.formexp.value.id,
      "nombre": this.formexp.value.nombre,
      "descripcion": this.formexp.value.descripcion,
      "img": this.formexp.value.img,
      "periodo_inicio": this.formexp.value.periodo_inicio,
      "periodo_fin": this.formexp.value.periodo_fin,
      }
    this.experienciaService.editExperiencia(this.edit).subscribe(data => {
      console.log("Editado"); 
    });
    location. reload();
 }

  GetEdit(id:number){
    this.experienciaService.getExperienciaById(id).subscribe(result => { 
      this.ExperienciaById = result;
      this.formexp.setValue({
        id:this.ExperienciaById.id,
        nombre:this.ExperienciaById.nombre,
        descripcion:this.ExperienciaById.descripcion,
        img:this.ExperienciaById.img,
        periodo_inicio:this.ExperienciaById.periodo_inicio,
        periodo_fin:this.ExperienciaById.periodo_fin
      });
    });
  }



/**/
}
