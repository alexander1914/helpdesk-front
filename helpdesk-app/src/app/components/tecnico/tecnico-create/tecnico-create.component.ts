import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-tecnico-create',
  standalone: true,
  imports: [MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIcon, MatButton, ReactiveFormsModule, RouterLink],
  templateUrl: './tecnico-create.component.html',
  styleUrl: './tecnico-create.component.css'
})
export class TecnicoCreateComponent {
  
  nameControl: FormControl = new FormControl(null, Validators.minLength(3));
  cpfControl: FormControl = new FormControl(null, Validators.required);
  emailControl: FormControl = new FormControl(null, Validators.email);
  passwordControl: FormControl = new FormControl(null, Validators.minLength(3));


  constructor() { }

  validateFields(): boolean {
    return this.nameControl.valid && this.cpfControl.valid && this.emailControl.valid && this.passwordControl.valid;
  }
}
