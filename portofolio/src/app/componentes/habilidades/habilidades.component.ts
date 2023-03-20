import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { HabilidadService } from 'src/app/service/habilidad.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit{
  
  Habilidad:any;
  editHabilidad:any;
  agregarHabilidad:any;
  HabilidadById:any;
  formHabilidad:FormGroup;

  constructor(public habilidadService : HabilidadService, private router:Router, private formBuilder: FormBuilder, config:NgbProgressbarConfig ){
    this.formHabilidad = this.formBuilder.group({
      id:['',[]],
      nombre:['',[Validators.required]],
      img:['',[Validators.required]],
      porcentaje:['',[Validators.required]]
    })
  }
  
  ngOnInit(): void {
    this.GetHabilidad();
    console.log("funciona");
  }
 
  GetHabilidad():void{
    this.habilidadService.getHabilidad().subscribe(result => {
      console.log(result); 
      this.Habilidad = result;
    });
  }

  AgregarHabilidad(event : Event){
    event.preventDefault;
    console.log("agregar hab");
    this.agregarHabilidad = {
      "nombre": this.formHabilidad.value.nombre,
      "img": this.formHabilidad.value.img,
      "porcentaje": this.formHabilidad.value.porcentaje,
      }
    this.habilidadService.addHabilidad(this.agregarHabilidad).subscribe(data => {
      console.log(data); 
    });
    location.reload();
  }

  vaciarForm(){
    console.log("vaciar formulario");
    this.formHabilidad.setValue({id:"",nombre:"",img:"",porcentaje:""});
  }

  EliminarHabilidad(){
    const id = this.formHabilidad.value.id;
    this.habilidadService.Eliminar(id).subscribe(data => {
      console.log(data); 
    });
    location.reload();
  }

  EditarHabilidad(){
    this.editHabilidad = {
      "id": this.formHabilidad.value.id,
      "nombre": this.formHabilidad.value.nombre,
      "img": this.formHabilidad.value.img,
      "porcentaje": this.formHabilidad.value.porcentaje,
      }
    this.habilidadService.editHabilidad(this.editHabilidad).subscribe(data => {
      console.log("Editado"); 
    });
    location. reload();
 }

  GetEditHabilidad(id:number){
    this.habilidadService.getHabilidadById(id).subscribe(result => { 
      this.HabilidadById = result;
      this.formHabilidad.setValue({
        id:this.HabilidadById.id,
        nombre:this.HabilidadById.nombre,
        img:this.HabilidadById.img,
        porcentaje:this.HabilidadById.porcentaje,
      });
    });
  }
}
