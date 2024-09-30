import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { NavComponent } from "./components/nav/nav.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, NavComponent], 
  templateUrl: 'app.component.html'
})
export class AppComponent {
  title = 'helpdesk-app';
}
