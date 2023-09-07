import { Component, HostBinding, OnDestroy, inject } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { menus } from '../circle-menu/circle-menu.component';
import { LayoutBackgroundService } from './layout-background.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  providers: [LayoutBackgroundService],
})
export class LayoutComponent implements OnDestroy {
  bg = inject(LayoutBackgroundService);
  private router = inject(Router);

  @HostBinding('class')
  get classObj() {
    if (this.bg.bgImage) {
      return { [this.bg.bgImage]: true };
    } else {
      return {};
    }
  }
  menuIndex = this.router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    map((e) => e.url),
    startWith(location.href),
    map((url) => {
      const index = menus.findIndex((m) => url.endsWith(m.path));
      console.log(index);
      return menus.length - index;
    })
  );

  private clearPortal = this.router.events
    .pipe(filter((e) => e instanceof NavigationStart))
    .subscribe(() => {
      this.bg.bgTemplate = null;
      this.bg.bgImage = '';
    });

  ngOnDestroy(): void {
    this.clearPortal.unsubscribe();
  }

  onClick() {
    this.router.navigate(['/']);
  }
}
