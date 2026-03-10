import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-chamado-create',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './chamado-create.component.html',
  styleUrl: './chamado-create.component.css'
})
export class ChamadoCreateComponent implements OnInit {

  priority: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  titulo: FormControl = new FormControl(null, [Validators.required]);
  observation: FormControl = new FormControl(null, [Validators.required]);
  technical: FormControl = new FormControl(null, [Validators.required]);
  customer: FormControl = new FormControl(null, [Validators.required]);

  constructor() { }

  ngOnInit(): void {

  }

  validateFields(): boolean {
    return this.priority.valid && this.status.valid &&
      this.titulo.valid && this.observation.valid &&
      this.technical.valid && this.customer.valid;
  }

}
