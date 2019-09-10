import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUnit, IBuilding } from '../game.interface';

type UnitOrBuilding = IUnit | IBuilding;
@Component({
  selector: 'app-list-of-buildinds',
  templateUrl: './list-of-buildinds.component.html',
  styleUrls: ['./list-of-buildinds.component.scss']
})
export class ListOfBuildindsComponent implements OnInit {

  @Input() prodactions: UnitOrBuilding;
  @Output() elementChange = new EventEmitter<UnitOrBuilding>();

  constructor() { }

  ngOnInit() {
  }

  public addToProd(element: UnitOrBuilding) {
    this.elementChange.emit(element);
  }

}
