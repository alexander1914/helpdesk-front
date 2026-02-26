import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { RouterLink, Router } from '@angular/router';
import { Cliente } from '../../../models/cliente';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-client-create',
  standalone: true,
  imports: [MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIcon, MatButton, ReactiveFormsModule, RouterLink],
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.css'
})
export class ClientCreateComponent {

  nameControl: FormControl = new FormControl(null, Validators.minLength(3));
  cpfControl: FormControl = new FormControl(null, Validators.required);
  emailControl: FormControl = new FormControl(null, Validators.email);
  passwordControl: FormControl = new FormControl(null, Validators.minLength(3));

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  };

  constructor(
    private clienteService: ClienteService,
    private toast: ToastrService,
    private router: Router
  ) { }

  create(): void {
    this.clienteService.createCliente(this.cliente).subscribe({
      next: () => {
        this.toast.success('Cliente cadastrado com sucesso!', 'Sucesso');
        this.router.navigate(['clientes']);
      },
      error: (ex) => {
        // Agora você pode capturar os erros de validação (ex: CPF já cadastrado)
        if (ex.error?.errors) {
          ex.error.errors.forEach(err => this.toast.error(err.message));
        } else {
          this.toast.error(ex.error?.message || 'Erro ao cadastrar cliente.');
        }
      }
    });
  }

  validateFields(): boolean {
    return this.nameControl.valid && this.cpfControl.valid && this.emailControl.valid && this.passwordControl.valid;
  }

  addPerfil(perfil: any): void {
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }
  }
}
