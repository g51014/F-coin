import { Component, HostListener } from '@angular/core';
import { WindowService } from '@services/window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private $window: WindowService
  ) {
    this.$window.resize();
  }
  @HostListener('window:resize') resize = () => this.$window.resize();
}
