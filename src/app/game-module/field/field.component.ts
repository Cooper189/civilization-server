import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPosition, IField } from '../game.interface';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() field: IField;
  @Input() position: IPosition;
  @Output() fieldOnClick = new EventEmitter<IPosition>();

  constructor() { }

  ngOnInit() {
  }
  public takeField() {
    this.fieldOnClick.emit(this.position);
  }
}
