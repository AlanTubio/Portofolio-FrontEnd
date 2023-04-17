import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  
  URL = 'https://port-backend-rtdl.onrender.com/personas/';
  
  constructor(private http: HttpClient) { 
  }

  public getPersona(): Observable<any>{
    return this.http.get(this.URL + 'traer');
  }
  
  public getPersonaById(Persona:persona): Observable<any>{
    return this.http.get<persona>(this.URL + Persona.id);
  }
  
  public editPersona(Persona:persona): Observable<any>{
    return this.http.put<persona>(this.URL + 'editar/'+ Persona.id , Persona);
  }

}
