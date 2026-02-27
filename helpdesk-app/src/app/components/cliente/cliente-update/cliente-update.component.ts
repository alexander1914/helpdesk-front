import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TecnicoService } from '../../../services/tecnico.service';

import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  standalone: true,
  imports: [MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIcon, MatButton, ReactiveFormsModule, RouterLink],
  templateUrl: './cliente-update.component.html',
  styleUrl: './cliente-update.component.css'
})
export class ClienteUpdateComponent {

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
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.convertIdNumber(id);
    this.findById();
  }

  update(): void {
    this.clienteService.updateCliente(this.cliente).subscribe({
      next: () => {
        this.toast.success('Cliente atualizado com sucesso', 'Update');
        this.router.navigate(['clientes']);
      },
      error: (ex) => {
        // Agora você pode capturar os erros de validação (ex: CPF já cadastrado)
        if (ex.error?.errors) {
          ex.error.errors.forEach(err => this.toast.error(err.message));
        } else {
          this.toast.error(ex.error?.message || 'Erro ao atualizar cliente.');
        }
      }
    });
  }

  findById(): void {
    this.clienteService.findByIdCliente(this.cliente.id)
      .subscribe(response => {
        this.cliente = response;
      });
  }

  validateFields(): boolean {
    return this.nameControl.valid && this.cpfControl.valid && this.emailControl.valid && this.passwordControl.valid;
  }

  addPerfil(perfil: any): void {
    // Convert incoming value to number just in case
    const perfilNum = Number(perfil);

    const index = this.cliente.perfis.indexOf(perfilNum);

    if (index !== -1) {
      this.cliente.perfis.splice(index, 1);
    } else {
      this.cliente.perfis.push(perfilNum);
    }
  }

  convertIdNumber(id: string) {
    if (id && !isNaN(Number(id))) {
      this.cliente.id = Number(id);
    } else {
      console.error("The ID in the URL is not a valid number!");
    }
  }
}
