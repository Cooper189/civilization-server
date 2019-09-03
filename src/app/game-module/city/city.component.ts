import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  @Input() cityObj: any;
  @Output() moveOnField = new EventEmitter<any>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public feildOnClick() {
    this.router.navigate(['/game/city', this.cityObj.id]);
    this.moveOnField.emit({x: this.cityObj.x, y: this.cityObj.y});
  }

}
