import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[defaultImage]'
})
export class NoImageDirective {

  private defaultImgUrl:string = 'assets/not-image.svg'

  constructor(private elementImg:ElementRef) { 
  }
  @HostListener('error')
  onError():void{
    this.elementImg.nativeElement.src = this.defaultImgUrl
  }

}
