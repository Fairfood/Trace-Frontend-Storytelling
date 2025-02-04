/* istanbul ignore file */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  // theme data
  @Input() data: any;
  // Always show fairfood footer
  fairfoodContext = {
    color: '#2DBDE9',
    linkedIn: 'https://www.linkedin.com/company/fairfoodnl/',
    facebook: 'https://www.facebook.com/Fairfood',
    instagram: 'https://www.instagram.com/fairfoodnl/',
    twitter: 'https://twitter.com/fairfood',
  };

}
