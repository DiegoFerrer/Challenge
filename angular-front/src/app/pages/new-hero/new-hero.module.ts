import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewHeroRoutingModule } from './new-hero.routing';
import { NewHeroComponent } from './new-hero.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    NewHeroComponent
  ],
  imports: [
    CommonModule,
    NewHeroRoutingModule,
    SharedModule
  ]
})
export class NewHeroModule { }
