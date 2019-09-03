import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
