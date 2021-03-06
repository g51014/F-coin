import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'pi-coin',
      loadChildren: () => import('./modules/pi-coin/pi-coin.module').then(m => m.PiCoinModule)
    },
    {
      path: 'news',
      loadChildren: () => import('./modules/news/news.module').then(m => m.NewsModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
