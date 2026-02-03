import { Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    {
        path: "", component: NavComponent, canActivate: [authGuard], children: [
            { path: "home", component: HomeComponent },
            { path: "tecnicos", component: TecnicoListComponent }
        ]
    }
];
