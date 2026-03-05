import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';

import { Chamado } from '../../../models/chamado';

@Component({
  selector: 'app-chamado-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatPaginator, MatFormFieldModule, MatInputModule, MatButton, RouterLink, MatRadioModule],
  templateUrl: './chamado-list.component.html',
  styleUrl: './chamado-list.component.css'
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [
    {
      id: 1,
      dataAbertura: "01/01/2026",
      dataFechamento: "31/12/2026",
      prioridade: "ALTA",
      status: "ANDAMENTO",
      titulo: "Chamado 001",
      descricao: "TESTE TESTE",
      tecnico: 1,
      cliente: 6,
      nomeCliente: "Bruna Carlos",
      nomeTecnico: "Alexander Oliveira"
    }
  ];

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
