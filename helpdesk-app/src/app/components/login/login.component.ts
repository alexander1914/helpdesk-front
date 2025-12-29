import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Credenciais } from '../../models/credenciais';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    email: '',
    password: ''
  }

  emailControl = new FormControl(null, Validators.email);
  passwordControl = new FormControl(null, Validators.minLength(3))

  constructor(private toast: ToastrService) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  validateFields(): boolean {
    if (this.emailControl.valid && this.passwordControl.valid) {
      return true;
    } else {
      return false;
    }
  }

  login(){
    this.toast.error('User and or password inválid', 'Login');
    this.creds.password = '';
  }

}
