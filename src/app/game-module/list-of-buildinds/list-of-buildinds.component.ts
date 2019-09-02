import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-of-buildinds',
  templateUrl: './list-of-buildinds.component.html',
  styleUrls: ['./list-of-buildinds.component.scss']
})
export class ListOfBuildindsComponent implements OnInit {
  @Input() prodactions: any;
  @Output() elementChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public addToProd(element) {
    this.elementChange.emit(element);
  }

}
