/* istanbul ignore file */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-invalid-link',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './invalid-link.component.html',
  styleUrls: ['./invalid-link.component.scss']
})
export class InvalidLinkComponent {

}
