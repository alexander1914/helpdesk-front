import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from "@angular/router";
import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnicos';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tecnico-create',
  standalone: true,
  imports: [MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIcon, MatButton, ReactiveFormsModule, RouterLink],
  templateUrl: './tecnico-create.component.html',
  styleUrl: './tecnico-create.component.css'
})
export class TecnicoCreateComponent {

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
    private router: Router
  ) { }

  create(): void {
  this.tecnicoService.createTecnico(this.tecnico).subscribe({
    next: () => {
      this.toast.success('Técnico cadastrado com sucesso!', 'Sucesso');
      this.router.navigate(['tecnicos']);
    },
    error: (ex) => {
      // Agora você pode capturar os erros de validação (ex: CPF já cadastrado)
      if (ex.error?.errors) {
        ex.error.errors.forEach(err => this.toast.error(err.message));
      } else {
        this.toast.error(ex.error?.message || 'Erro ao cadastrar técnico.');
      }
    }
  });
}

  validateFields(): boolean {
    return this.nameControl.valid && this.cpfControl.valid && this.emailControl.valid && this.passwordControl.valid;
  }

  addPerfil(perfil: any): void {
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil);
    }
  }
}
