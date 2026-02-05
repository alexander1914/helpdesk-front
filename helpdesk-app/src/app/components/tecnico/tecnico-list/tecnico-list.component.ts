import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Tecnico } from '../../../models/tecnicos';
import { TecnicoService } from '../../../services/tecnico.service';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-tecnico-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatPaginator, MatFormFieldModule, MatInputModule, MatButton],
  templateUrl: './tecnico-list.component.html',
  styleUrl: './tecnico-list.component.css'
})
export class TecnicoListComponent {

  ELEMENT_DATA: Tecnico[] = []

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private serviceTecnico: TecnicoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.serviceTecnico.findAllTecnicos().subscribe(response => {
      this.ELEMENT_DATA = response;      
      this.dataSource = new MatTableDataSource<Tecnico>(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


