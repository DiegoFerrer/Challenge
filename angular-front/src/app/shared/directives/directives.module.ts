import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoImageDirective } from './custom/no-image.directive';



@NgModule({
  declarations: [
    NoImageDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NoImageDirective
  ]
})
export class DirectivesModule { }
