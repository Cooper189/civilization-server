import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


// const temp = () => {
//   const arr = [];
//   for (let index = 0; index < 10; index++) {
//       const arrs = [];
//       for (let s = 0; s < 10; s++) {
//         arrs.push(false);
//       }
//       arr.push(arrs);
//   }
//   return arr;
// };
@Component({
  selector: 'app-unit-field',
  templateUrl: './unit-field.component.html',
  styleUrls: ['./unit-field.component.scss']
})
export class UnitFieldComponent implements OnInit {
  @Input()player: any;
  @Output() unitOnClick = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  public unitWillMove() {
    this.unitOnClick.emit(this.player);
  }
}
