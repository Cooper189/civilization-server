import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAddImage]'
})
export class AddImageDirective implements OnInit {
  @Input('appAddImage') imageUrl;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    const some = {
      width: '100px',
      height: '100px',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundImage: `url('${this.imageUrl}')`,
      backgroundRepeat: 'no-repeat'
    };

    // tslint:disable-next-line: forin
    for (const i in some) {
        this.elementRef.nativeElement.style[i] = some[i];
    }
  }
}

