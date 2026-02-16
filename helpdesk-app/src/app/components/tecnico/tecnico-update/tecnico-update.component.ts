import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Tecnico } from '../../../models/tecnicos';
import { TecnicoService } from '../../../services/tecnico.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tecnico-update',
  standalone: true,
  imports: [MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIcon, MatButton, ReactiveFormsModule, RouterLink],
  templateUrl: './tecnico-update.component.html',
  styleUrl: './tecnico-update.component.css'
})
export class TecnicoUpdateComponent {

  nameControl: FormControl = new FormControl(null, Validators.minLength(3));
  cpfControl: FormControl = new FormControl(null, Validators.required);
  emailControl: FormControl = new FormControl(null, Validators.email);
  passwordControl: FormControl = new FormControl(null, Validators.minLength(3));

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

  update(): void {
    this.tecnicoService.updateTecnico(this.tecnico).subscribe({
      next: () => {
        this.toast.success('Técnico atualizado com sucesso', 'Update');
        this.router.navigate(['tecnicos']);
      },
      error: (ex) => {
        // Agora você pode capturar os erros de validação (ex: CPF já cadastrado)
        if (ex.error?.errors) {
          ex.error.errors.forEach(err => this.toast.error(err.message));
        } else {
          this.toast.error(ex.error?.message || 'Erro ao atualizar técnico.');
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

  validateFields(): boolean {
    return this.nameControl.valid && this.cpfControl.valid && this.emailControl.valid && this.passwordControl.valid;
  }

  addPerfil(perfil: any): void {
    // Convert incoming value to number just in case
    const perfilNum = Number(perfil);

    const index = this.tecnico.perfis.indexOf(perfilNum);

    if (index !== -1) {
      this.tecnico.perfis.splice(index, 1);
    } else {
      this.tecnico.perfis.push(perfilNum);
    }
  }
  
  convertIdNumber(id: string) {
    if (id && !isNaN(Number(id))) {
      this.tecnico.id = Number(id);
    } else {
      console.error("The ID in the URL is not a valid number!");
    }
  }
}
