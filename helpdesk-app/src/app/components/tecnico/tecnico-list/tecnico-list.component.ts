import { Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Tecnico } from '../../../models/tecnicos';

@Component({
  selector: 'app-tecnico-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatPaginator],
  templateUrl: './tecnico-list.component.html',
  styleUrl: './tecnico-list.component.css'
})
export class TecnicoListComponent {
  
  ELEMENT_DATA: Tecnico[] = [
    {
      id: 1,
      nome: 'Alexander Oliveira',
      cpf: '456.789.620-10',
      email: 'alexander.oliveira99@gmail.com',
      senha: '123789',
      perfis: ['0'],
      dataCriacao: '15/08/2022'
    }
  ]

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  constructor(){ }

  ngOnInit(): void {
        
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {    
    this.dataSource.paginator = this.paginator; 
  }
}


