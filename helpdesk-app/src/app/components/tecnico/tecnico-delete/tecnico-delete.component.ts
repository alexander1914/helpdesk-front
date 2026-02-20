import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Tecnico } from '../../../models/tecnicos';
import { TecnicoService } from '../../../services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  standalone: true,
  imports: [MatCheckboxModule, MatInputModule, MatIcon, MatButton, RouterLink, FormsModule],
  templateUrl: './tecnico-delete.component.html',
  styleUrl: './tecnico-delete.component.css'
})
export class TecnicoDeleteComponent {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  };

  constructor(
    private tecnicoService: TecnicoService,
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
    this.tecnicoService.deleteTecnico(this.tecnico.id).subscribe({
      next: () => {
        this.toast.success('Técnico deletado com sucesso', 'Delete');
        this.router.navigate(['tecnicos']);
      },
      error: (ex) => {        
        if (ex.error?.errors) {
          ex.error.errors.forEach(err => this.toast.error(err.message));
        } else {
          this.toast.error(ex.error?.message || 'Erro ao deletar técnico.');
        }
      }
    });
  }

  findById(): void {
    this.tecnicoService.findById(this.tecnico.id)
      .subscribe(response => {
        this.tecnico = response;
      });
  }

  convertIdNumber(id: string) {
    if (id && !isNaN(Number(id))) {
      this.tecnico.id = Number(id);
    } else {
      console.error("The ID in the URL is not a valid number !");
    }
  }
}
