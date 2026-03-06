import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';

import { Chamado } from '../../../models/chamado';
import { ChamadoService } from '../../../services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatPaginator, MatFormFieldModule, MatInputModule, MatButton, RouterLink, MatRadioModule],
  templateUrl: './chamado-list.component.html',
  styleUrl: './chamado-list.component.css'
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [];
  FILTERED_DATA: Chamado[] = [];

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private chamadoService: ChamadoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.chamadoService.findAllChamados().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Chamado>(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  orderByStatus(status: any): void {
    let list: Chamado[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if (element.status == status) {
        list.push(element);
      }
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Chamado>(list);
    this.dataSource.paginator = this.paginator;
  }

}
