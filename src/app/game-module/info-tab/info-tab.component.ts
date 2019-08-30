import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-tab',
  templateUrl: './info-tab.component.html',
  styleUrls: ['./info-tab.component.scss']
})
export class InfoTabComponent implements OnInit {
  @Input() unit: any;
  @Output() create = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public cityCreate() {
    this.create.emit(true);
  }

}
