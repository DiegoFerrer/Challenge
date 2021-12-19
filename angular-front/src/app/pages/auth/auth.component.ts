import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/pages/auth/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  formLogin!: FormGroup;
  HidemessageError: boolean = false;

  constructor(private route: Router, private loginService:LoginService) { }

  ngOnInit(): void {
    const token: string | boolean | null = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : false;
    !!token && this.route.navigate(['/home']);
    this.createForm()
  }

  createForm(){
    this.formLogin = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login(){

    if (this.formLogin.valid) {
      const user = this.formLogin.value;
      this.loginService.login(user).subscribe((response:any) => {
        // Guardar token
        sessionStorage.setItem('token', response.body.token)
        // Redireccionar al login
        this.route.navigate(['/home'])

      },(error: { status: number; }) => this.workingError(error.status))
    }
  }

  workingError(status:number){

    switch (status) {
      case 401:
        this.HidemessageError = true;
        setTimeout(() => {
          this.HidemessageError = false;
        }, 4000);
        break;
      default:
        this.route.navigate(['error']);
        break;
    }
  }

  eventEnter(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      event.preventDefault();
      this.login();
    }
  }

}
