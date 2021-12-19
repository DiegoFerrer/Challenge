import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HeroesService } from 'src/app/core/services/heroes.service';
import { bodyHero, Hero } from 'src/app/shared/interfaces/heroes.interface';

const EMPTY_HERO:Hero = {
  id:'',
  name:'',
  speed:0,
  power:0,
  urlImage:''
}

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.scss'],
})
export class NewHeroComponent implements OnInit {
  formHero!: FormGroup;
  hero!: Hero;
  constructor(private routeActive: ActivatedRoute,private route: Router, private heroesService: HeroesService) {
    this.routeActive.paramMap.pipe( map(() => window.history.state )).subscribe((response:Hero) => {
      if(response.hasOwnProperty('id')) this.hero = response

    })
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    const valueName = this.hero ? this.hero.name : ''
    const valueSpeed = this.hero ? this.hero.speed : ''
    const valuePower = this.hero ? this.hero.power : ''
    const valueUrl = this.hero ? this.hero.urlImage : ''


    this.formHero = new FormGroup({
      name: new FormControl(valueName, [Validators.required]),
      speed: new FormControl(valueSpeed, [
        Validators.required,
        Validators.minLength(1),
      ]),
      power: new FormControl(valuePower, [
        Validators.required,
        Validators.minLength(1),
      ]),
      urlImage: new FormControl(valueUrl),
    });
  }

  isNumberKey(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formHero.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlValid(controlName: string): boolean {
    const control = this.formHero.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  createHero() {
    if (!this.formHero.valid) return;

    const newHero: bodyHero = this.formHero.value;

    this.heroesService.createHero(newHero).subscribe(
      (response) => {
        this.route.navigateByUrl('home')
      },
      (error) => this.route.navigate(['error'])
    );
  }

  editHero(){
    if (!this.formHero.valid) return;
    const hero: bodyHero =this.formHero.value
    
    const id:string = this.hero.id

    this.heroesService.updateHero(id,hero).subscribe(
      (response) => {
        this.route.navigateByUrl('home')
      },
      (error) => this.route.navigate(['error'])
    );

  }
}
