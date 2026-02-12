import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Credenciais } from '../../models/credenciais';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private toast: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  validateFields(): boolean {
    if (this.emailControl.valid && this.passwordControl.valid) {
      return true;
    } else {
      return false;
    }
  }

  login() {
    this.authService.authenticate(this.creds).subscribe({
      next: (response) => {
        // O header 'Authorization' só será lido se o backend liberar o Expose-Headers
        const token = response.headers.get('Authorization');
        if (token) {
          this.authService.successfulLogin(token);
          this.toast.success('Login realizado com sucesso!');
          this.router.navigate(['home']);
        }
      },
      error: (ex) => {
        console.error('Erro detalhado:', ex);
        if (ex.status === 0) {
          this.toast.error('O servidor não respondeu. Possível erro de CORS ou Backend offline.');
        } else {
          this.toast.error('Usuário ou senha inválidos');
        }
      }
    });
  }

}
