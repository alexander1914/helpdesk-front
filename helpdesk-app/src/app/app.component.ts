import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule], 
  templateUrl: 'app.component.html'
})
export class AppComponent {
  title = 'helpdesk-app';
}
