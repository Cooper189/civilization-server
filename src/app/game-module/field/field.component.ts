import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input()position: any;
  @Output()fieldOnClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  public takeField() {
    this.fieldOnClick.emit(this.position);
  }
}
