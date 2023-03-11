import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExperienciaService } from 'src/app/service/experiencia.service';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css']
})
export class ExperienciasComponent implements OnInit{
  
  Experiencia:any;
  ExperienciaById:any;
  formexp:FormGroup;
  
  constructor(public experienciaService : ExperienciaService, private router:Router, private formBuilder: FormBuilder){
    this.formexp = this.formBuilder.group({
      id:['',[Validators.required]],
      nombre:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      img:['',[Validators.required]],
      periodo_inicio:['',[Validators.required]],
      periodo_fin:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.experienciaService.getExperiencia().subscribe(data => {
      console.log(data); 
      this.Experiencia = data;
    });
  }

  GetEdit(id:number){
    console.log(id);
    this.experienciaService.getExperienciaById(id).subscribe(data => {
      console.log(data); 
      this.ExperienciaById = data;
    });
  }

  Editarexp(){
    console.log(this.formexp); 
    this.Experiencia = {
      "id": this.formexp.value.id,
      "nombre": this.formexp.value.nombre,
      "descripcion": this.formexp.value.descripcion,
      "img": this.formexp.value.img,
      "periodo_inicio": this.formexp.value.periodo_inicio,
      "periodo_fin": this.formexp.value.periodo_fin,
      }
    this.experienciaService.editExperiencia(this.Experiencia).subscribe(data => {
      console.log(data);
      this.router.navigate(['']);
      location.reload();
    });
 }
}
