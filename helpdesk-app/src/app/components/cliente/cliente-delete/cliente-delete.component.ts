import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-delete',
  standalone: true,
  imports: [MatCheckboxModule, MatInputModule, MatIcon, MatButton, RouterLink, FormsModule],
  templateUrl: './cliente-delete.component.html',
  styleUrl: './cliente-delete.component.css'
})
export class ClienteDeleteComponent {

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

  delete(): void {
    this.clienteService.deleteCliente(this.cliente.id).subscribe({
      next: () => {
        this.toast.success('Cliente deletado com sucesso', 'Delete');
        this.router.navigate(['clientes']);
      },
      error: (ex) => {
        if (ex.error?.errors) {
          ex.error.errors.forEach(err => this.toast.error(err.message));
        } else {
          this.toast.error(ex.error?.message || 'Erro ao deletar o cliente.');
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

  convertIdNumber(id: string) {
    if (id && !isNaN(Number(id))) {
      this.cliente.id = Number(id);
    } else {
      console.error("The ID in the URL is not a valid number !");
    }
  }
}
