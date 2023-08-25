import { Component, HostBinding, OnDestroy, inject } from '@angular/core';
import { LayoutBackgroundService } from './layout-background.service';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  providers: [LayoutBackgroundService],
})
export class LayoutComponent implements OnDestroy {
  bg = inject(LayoutBackgroundService);
  private route = inject(Router);

  @HostBinding('class')
  get classObj() {
    if (this.bg.bgImage) {
      return { [this.bg.bgImage]: true };
    } else {
      return {};
    }
  }

  private clearPortal = this.route.events
    .pipe(filter((e) => e instanceof NavigationStart))
    .subscribe(() => {
      this.bg.bgTemplate = null;
      this.bg.bgImage = '';
    });

  ngOnDestroy(): void {
    this.clearPortal.unsubscribe();
  }
}
