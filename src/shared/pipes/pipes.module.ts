import { EmptySymbolPipe } from './empty-symbol.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatePipe } from './custom-date.pipe';



@NgModule({
  declarations: [
    CustomDatePipe,
    EmptySymbolPipe
  ],
  exports: [
    CustomDatePipe,
    EmptySymbolPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
