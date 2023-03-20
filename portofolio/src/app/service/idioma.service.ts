import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { idioma } from '../models/idioma';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {

  URL = 'http://localhost:8080/idiomas/';
  constructor(private http: HttpClient) { }

  public getIdioma(): Observable<any>{
    return this.http.get(this.URL + 'traer');
  }

  public addIdioma(agregar:any){
    return this.http.post<idioma>(this.URL + 'crear', agregar)
  }
  
  public editIdioma(edit:idioma){
    return this.http.put<idioma>(this.URL + 'editar/'+ edit.id , edit)
  }
  
  public Eliminar(id:any){
    return this.http.delete<any>(this.URL + 'borrar/'+ id)
  }

  public getIdiomaById(id:number){
    return this.http.get<number>(this.URL + id)
  }
}
