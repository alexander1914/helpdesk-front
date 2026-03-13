import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Chamado } from '../../../models/chamado';
import { Cliente } from '../../../models/cliente';
import { Tecnico } from '../../../models/tecnicos';
import { ClienteService } from '../../../services/cliente.service';
import { TecnicoService } from '../../../services/tecnico.service';
import { ChamadoService } from '../../../services/chamado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chamado-update',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, NgForOf, RouterLink],
  templateUrl: './chamado-update.component.html',
  styleUrl: './chamado-update.component.css'
})
export class ChamadoUpdateComponent {

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
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.convertIdNumber(id);
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  update(): void {
    this.chamadoService.updateChamado(this.chamado).subscribe({
      next: () => {
        this.toastService.success('Chamado atualizado com sucesso', 'Atualizar chamado');
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

  findById(): void {
    this.chamadoService.findByIdChamado(this.chamado.id).subscribe(response => {
      this.chamado = response;
    });
  }

  validateFields(): boolean {
    return this.priority.valid && this.status.valid &&
      this.titulo.valid && this.observation.valid &&
      this.technical.valid && this.customer.valid;
  }

  convertIdNumber(id: string) {
    if (id && !isNaN(Number(id))) {
      this.chamado.id = Number(id);
    } else {
      console.error("The ID in the URL is not a valid number!");
    }
  }

  getStatus(status: any): string {
    if (status == 0) {
      return 'ABERTO';
    } else if (status == 1) {
      return 'EM ANDAMENTO';
    } else {
      return 'ENCERRADO';
    }
  }

  getPriority(priority: any): string {
    if (priority == 0) {
      return 'BAIXA';
    } else if (priority == 1) {
      return 'MÉDIA';
    } else {
      return 'ALTA';
    }
  }
}
