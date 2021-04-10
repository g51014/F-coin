import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsCenterComponent } from './pages/news-center/news-center.component';

const routes: Routes = [{
  path: '', component: NewsCenterComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
