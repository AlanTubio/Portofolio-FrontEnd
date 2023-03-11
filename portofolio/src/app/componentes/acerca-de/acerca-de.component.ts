import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { persona } from 'src/app/models/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})

export class AcercaDeComponent implements OnInit{
  
  form:FormGroup;
  Persona:any;

  constructor(public personaService : PersonaService, private router:Router, private formBuilder : FormBuilder){
    this.form = this.formBuilder.group({
      id:['1',[Validators.required]],
      nombre:['',[Validators.required]],
      apellido:['',[Validators.required]],
      img:['',[Validators.required]],
      titulo:['',[Validators.required]],
      info:['',[Validators.required]]
    })

  }

  ngOnInit(): void {
    this.personaService.getPersona().subscribe(data => {
      console.log(data); 
      this.Persona = data;
    }); 
    
  }

  Editar(){
      console.log(this.form); 
      this.Persona = {
        "id": this.form.value.id,
        "nombre": this.form.value.nombre,
        "apellido": this.form.value.apellido,
        "img": this.form.value.img,
        "titulo": this.form.value.titulo,
        "info": this.form.value.info,
        }
      this.personaService.editPersona(this.Persona).subscribe(data => {
        this.router.navigate(['']);
        location.reload();
      });
   }
}
