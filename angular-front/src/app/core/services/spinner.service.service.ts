import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  inProgress: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  // mostrar el spining
  show() {
      this.inProgress.next(true);
  }

  // ocultar el spining
  hide() {
      this.inProgress.next(false);
  }
}
