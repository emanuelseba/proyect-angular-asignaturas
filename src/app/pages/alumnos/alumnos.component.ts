import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosResponse } from 'src/app/interfaces/alumnos-response.interface';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  public idCurso = "";
  curso: any = {};
  alumnos: AlumnosResponse[] = [];

  constructor(private router: Router, private activateRouted: ActivatedRoute, private cursosService: CursosService) {
  }

  ngOnInit(): void {
    this.activateRouted.queryParams.subscribe(params => {
      this.idCurso = params['id'];
      if (params['id']) {
        const observable = this.cursosService.getCurso(params['id']);
        observable.subscribe((response) => {
          this.curso = response;
        });

        /* Obtener Alumnos inscritos en el curso*/

        const observablePersona = this.cursosService.getAlumnos(params['id']);
        observablePersona.subscribe((response) => {
          this.alumnos = response;
        });
        
      }

    });

  }

  cargarNotas(alumno: AlumnosResponse) {
    this.router.navigate(['/home'], { queryParams: { id: this.idCurso, rut: alumno.idPersona } });
  }

}
