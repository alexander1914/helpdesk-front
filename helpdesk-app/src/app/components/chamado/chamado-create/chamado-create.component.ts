import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Cliente } from '../../../models/cliente';
import { Tecnico } from '../../../models/tecnicos';
import { ClienteService } from '../../../services/cliente.service';
import { TecnicoService } from '../../../services/tecnico.service';
import { ChamadoService } from '../../../services/chamado.service';
import { NgForOf } from '@angular/common';
import { Chamado } from '../../../models/chamado';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-chamado-create',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, NgForOf, RouterLink],
  templateUrl: './chamado-create.component.html',
  styleUrl: './chamado-create.component.css'
})
export class ChamadoCreateComponent implements OnInit {

  clientes: Cliente[];
  tecnicos: Tecnico[];

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
  };

  priority: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  titulo: FormControl = new FormControl(null, [Validators.required]);
  observation: FormControl = new FormControl(null, [Validators.required]);
  technical: FormControl = new FormControl(null, [Validators.required]);
  customer: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private chamadoService: ChamadoService,
    private toastService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  create(): void {
    this.chamadoService.createChamado(this.chamado).subscribe({
      next: () => {
        this.toastService.success('Chamado criado com sucesso', 'Novo chamado');
        this.router.navigate(['chamados'])
      },
      error: (ex) => {
        // Captura se houver um erro ao criar o chamado
        if (ex.error?.errors) {
          ex.error.errors.forEach(err => this.toastService.error(err.message));
        } else {
          this.toastService.error(ex.error?.message || 'Erro ao cadastrar cliente.');
        }
      }
    });
  }

  findAllClientes(): void {
    this.clienteService.findAllCliente().subscribe(response => {
      this.clientes = response;
    });
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAllTecnicos().subscribe(response => {
      this.tecnicos = response;
    });
  }

  validateFields(): boolean {
    return this.priority.valid && this.status.valid &&
      this.titulo.valid && this.observation.valid &&
      this.technical.valid && this.customer.valid;
  }

}
