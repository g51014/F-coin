import { DirectivesModule } from './directives/directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from './pipes/pipes.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    DirectivesModule
  ]
})
export class SharedModule { }
