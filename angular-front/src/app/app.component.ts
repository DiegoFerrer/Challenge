import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { SpinnerService } from './core/services/spinner.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  inProgress = new Subject<boolean>();
  constructor(private spinnerService:SpinnerService){this.inProgress}
  ngOnInit(){
    this.inProgress = this.spinnerService.inProgress;
  }
}
