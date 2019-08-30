import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appUnit]'
})
export class UnitDirective implements OnInit {
  @Input('appUnit') unit;

  constructor(private ref: ElementRef) {
  }

  ngOnInit() {
    this.ref.nativeElement.style.position = 'absolute';
    this.ref.nativeElement.style.top = `${this.unit.x * 100}px`;
    this.ref.nativeElement.style.left = `${this.unit.y * 100}px`;
  }

}
