import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Chamado } from '../../../models/chamado';
import { ChamadoService } from '../../../services/chamado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chamado-read',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, RouterLink],
  templateUrl: './chamado-read.component.html',
  styleUrl: './chamado-read.component.css'
})
export class ChamadoReadComponent {

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

  constructor(
    private chamadoService: ChamadoService,
    private toastService: ToastrService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.convertIdNumber(id);
    this.findById();
  }

  read(): void {

  }

  findById(): void {
    this.chamadoService.findByIdChamado(this.chamado.id).subscribe(response => {
      this.chamado = response;
    });
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
