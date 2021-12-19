import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './custom/capitalize.pipe';




@NgModule({
  declarations: [

  
    CapitalizePipe
  ],
  exports:[
    CapitalizePipe
  ]
})
export class PipesModule { }
