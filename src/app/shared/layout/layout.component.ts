import { Component, inject } from '@angular/core';
import { LayoutBackgroundService } from './layout-background.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  providers: [LayoutBackgroundService]
})
export class LayoutComponent {
  bg = inject(LayoutBackgroundService);
}
