import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienciaService } from 'src/app/service/experiencia.service';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css']
})
export class ExperienciasComponent implements OnInit{
  
  Experiencia:any;

  constructor(public experienciaService : ExperienciaService, private router:Router){
  }

  ngOnInit(): void {
    this.experienciaService.getExperiencia().subscribe(data => {
      console.log(data); 
      this.Experiencia = data;
    });
  }

}
