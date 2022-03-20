import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotasResponse } from 'src/app/interfaces/notas-response.interface';
import { CursosService } from 'src/app/services/cursos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  public idCurso = "";
  public rut = "";
  nota: any = {};
  alumno: any = {};
  notas: NotasResponse[] = [];

  form = new FormGroup({
    nota: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)])
  });

  constructor(private router: Router, private activateRouted: ActivatedRoute, private cursosService: CursosService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.activateRouted.queryParams.subscribe(params => {
      this.idCurso = params['id'];
      this.rut = params['rut'];
      if (params['id'] && params['rut']) {
        const observable = this.cursosService.getNotas(params['id'], params['rut']);
        observable.subscribe((response) => {
          this.notas = response;
        });

        const observableAlumno = this.cursosService.getAlumno(params['rut']);
        observableAlumno.subscribe((response) => {
          this.alumno = response;
        });

      }

    });
  }

   savePost(event: any) {
    event.preventDefault();
    if (!this.form.valid) {
      alert("El formulario no es valido!");
    }
    this.activateRouted.queryParams.subscribe(params => {
      this.idCurso = params['id'];
      this.rut = params['rut'];
      const observable = this.cursosService.savePost(this.form.value.nota, params['id'], params['rut']);
      observable.subscribe((response) => {
        this.notas.push(response)
        console.log(response);
        console.log(this.notas);
        // this.modalService.dismissAll();
        // this.router.navigate(['/home'], { queryParams: { id: this.idCurso, rut: this.rut } })
        //   .then(() => {
        //     window.location.reload();
        //   });
      });
    });


  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }

 

  updatePost(event: any) {

    event.preventDefault();
    if (!this.form.valid) {
      alert("El formulario no es valido!");
    }
    this.activateRouted.queryParams.subscribe(params => {
      this.idCurso = params['id'];
      this.rut = params['rut'];
      const observable = this.cursosService.savePost(this.form.value.nota, params['id'], params['rut']);
      observable.subscribe((response) => {
        this.modalService.dismissAll();
        window.location.reload();
        // this.router.navigate(['/home'], { queryParams: { id: this.idCurso, rut: this.rut } });
        // this.router.config.unshift({ path: 'RELOAD_PLACEHOLDER' });
      });
    });


  }

}
