import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  
  URL = 'http://localhost:8080/personas/';
  
  constructor(private http: HttpClient) { 
  }

  public getPersona(): Observable<any>{
    return this.http.get(this.URL + 'traer');
  }
  
  public getPersonaId(form:FormGroup){
    return this.http.get<FormGroup>(this.URL + form);
  }
  
  public editPersona(form:FormGroup){
    return this.http.put<FormGroup>(this.URL + 'editar/'+ form.value.id , form);
  }

}
