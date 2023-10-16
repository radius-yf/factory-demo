import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'factory',
        loadChildren: () =>
          import('./factory/factory.module').then((m) => m.FactoryModule),
      },
      {
        path: 'detail',
        loadChildren: () =>
          import('./detail/detail.module').then((m) => m.DetailModule),
      },
      {
        path: 'customer',
        loadChildren: () =>
          import('./customer/detail.module').then((m) => m.DetailModule),
      },
      {
        path: 'detail2',
        loadChildren: () =>
          import('./detail1/detail.module').then((m) => m.DetailModule),
      },
      {
        path: 'honor',
        loadChildren: () =>
          import('./honor/detail.module').then((m) => m.DetailModule),
      },
      {
        path: 'safe',
        loadChildren: () =>
          import('./safe/safe.module').then((m) => m.SafeModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
