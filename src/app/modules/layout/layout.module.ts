import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './pages/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MenuComponent,
    FriendsListComponent
  ],
  exports: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LayoutModule { }
