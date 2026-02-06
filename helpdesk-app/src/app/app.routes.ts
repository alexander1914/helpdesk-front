import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';

import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth/auth.guard';

import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    {
        path: "", component: NavComponent, canActivate: [authGuard], children: [
            { path: "home", component: HomeComponent },

            { path: "tecnicos", component: TecnicoListComponent },
            { path: "tecnicos/create", component: TecnicoCreateComponent}
        ]
    }
];
