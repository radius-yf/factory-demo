import { Component, OnDestroy, inject } from '@angular/core';
import { LayoutBackgroundService } from './layout-background.service';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  providers: [LayoutBackgroundService],
})
export class LayoutComponent implements OnDestroy{
  bg = inject(LayoutBackgroundService);
  private route = inject(Router);

  private clearPortal = this.route.events
    .pipe(filter((e) => e instanceof NavigationStart))
    .subscribe(() => {
      this.bg.bgTemplate = null;
    });

  ngOnDestroy(): void {
    this.clearPortal.unsubscribe();
  }
}
