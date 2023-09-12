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
      // {
      //   path: 'logistics',
      //   loadChildren: () =>
      //     import('./logistics/logistics.module').then((m) => m.LogisticsModule),
      // },
      {
        path: 'detail',
        loadChildren: () =>
          import('./detail/detail.module').then((m) => m.DetailModule),
      },
      {
        path: 'detail1',
        loadChildren: () =>
          import('./detail/detail.module').then((m) => m.DetailModule),
      },
      {
        path: 'detail2',
        loadChildren: () =>
          import('./detail/detail.module').then((m) => m.DetailModule),
      },
      {
        path: 'detail3',
        loadChildren: () =>
          import('./detail/detail.module').then((m) => m.DetailModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
