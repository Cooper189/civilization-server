import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUnit } from '../game.interface';

@Component({
  selector: 'app-unit-field',
  templateUrl: './unit-field.component.html',
  styleUrls: ['./unit-field.component.scss']
})
export class UnitFieldComponent implements OnInit {
  @Input() player: IUnit;
  @Output() unitOnClick = new EventEmitter<IUnit>();

  constructor() {
  }

  ngOnInit() {
  }

  public unitWillMove() {
    this.unitOnClick.emit(this.player);
  }
}
