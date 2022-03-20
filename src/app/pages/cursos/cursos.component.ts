import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosResponse } from 'src/app/interfaces/cursos-response.interface';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursos:CursosResponse[] = [];
  @Input() curso: any = {};

  constructor(private router: Router,private activateRouted:ActivatedRoute, private cursosService:CursosService) { 

    this.activateRouted.params.subscribe(params =>{
      const observable = this.cursosService.getCursos();
      observable.subscribe((response) => {
        this.cursos = response;
      });
    });

    
    

   }

  ngOnInit(): void {
  }

  cargarDatos(curso: CursosResponse) {
    this.router.navigate(['/home'], { queryParams: { id: curso.idCurso } });
  }

}
