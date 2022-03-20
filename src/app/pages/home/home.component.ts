import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() curso: any = {};
  
  isHidden: boolean = false;

  form = new FormGroup({
    rut:new FormControl('',[ Validators.required, Validators.minLength(9)]),
    pass: new FormControl('',[ Validators.required])
  });

  

  constructor() { }

  ngOnInit(): void {

  
  }
  

}
