import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUnit } from '../game.interface';

@Component({
  selector: 'app-info-tab',
  templateUrl: './info-tab.component.html',
  styleUrls: ['./info-tab.component.scss']
})
export class InfoTabComponent implements OnInit {
  @Input() unit: IUnit;
  @Output() create = new EventEmitter<boolean>();
  @Output() build = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public cityCreate() {
    this.create.emit(true);
  }
  public createBuilding() {
    this.build.emit(true);
  }

}
