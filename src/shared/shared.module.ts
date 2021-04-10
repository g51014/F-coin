import { DirectivesModule } from './directives/directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from './pipes/pipes.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    DirectivesModule,
    HttpClientModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    DirectivesModule,
    HttpClientModule
  ]
})
export class SharedModule { }
