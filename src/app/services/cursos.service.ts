import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CursosResponse } from '../interfaces/cursos-response.interface';
import { AlumnosResponse } from '../interfaces/alumnos-response.interface';

import { environment } from '../../environments/environment';
import { NotasResponse } from '../interfaces/notas-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private httpClient: HttpClient) { }

  getCursos() : Observable<CursosResponse[]>{
    return this.httpClient.get<CursosResponse[]>(environment.api+'/cursos');
  }
  getCurso(id: number) : Observable<CursosResponse>{
    return this.httpClient.get<CursosResponse>(`${environment.api}/cursos/${id}`);
  }
  getAlumnos(id: number) : Observable<AlumnosResponse[]>{
    return this.httpClient.get<AlumnosResponse[]>(`${environment.api}/cursos/${id}/personas`);
  }
  getAlumno(id: number) : Observable<AlumnosResponse[]>{
    return this.httpClient.get<AlumnosResponse[]>(`${environment.api}/personas/${id}`);
  }
  getNotas(id: number, rut: number) : Observable<NotasResponse[]>{
    return this.httpClient.get<NotasResponse[]>(`${environment.api}/cursos/${id}/personas/${rut}`);
  }
  savePost(nota: number, idCurso: number, idPersona: number): Observable<NotasResponse> {

    return this.httpClient.post<NotasResponse>(environment.api+'/notas', {
      nota:nota,
      persona:{
        idPersona: idPersona
      },
      curso:{
        idCurso: idCurso
      }
    });
  }
}
