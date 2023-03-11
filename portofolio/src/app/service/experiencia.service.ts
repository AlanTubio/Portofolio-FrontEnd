import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  URL = 'http://localhost:8080/experiencias/';
  constructor(private http: HttpClient) { }

  public getExperiencia(): Observable<any>{
    return this.http.get(this.URL + 'traer');
  }

  public editExperiencia(Experiencia:experiencia){
    return this.http.put<experiencia>(this.URL + 'editar/'+ Experiencia.id , Experiencia);
  }

  public getExperienciaById(id:number){
    return this.http.get<number>(this.URL + id);
  }
}
