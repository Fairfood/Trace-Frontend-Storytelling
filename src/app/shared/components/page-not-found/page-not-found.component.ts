import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  standalone: true,
})
export class PageNotFoundComponent {
  redirectUrl: string = environment.redirectUrl;
}
