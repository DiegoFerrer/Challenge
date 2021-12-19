import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input()
  heroDelete!: Hero 

  @Output()
  clickModalOuput = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  clickModal(value:boolean){
    const response = {
      value,
      hero:this.heroDelete
    }
    this.clickModalOuput.emit(response)
  }

}
