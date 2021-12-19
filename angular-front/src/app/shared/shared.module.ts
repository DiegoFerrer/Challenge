import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule,
  ],
  exports:[
    SpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule,
  ],
})
export class SharedModule { }
