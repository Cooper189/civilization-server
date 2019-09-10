import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IPosition, ICity } from '../game.interface';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  @Input() cityObj: ICity;
  @Output() moveOnField = new EventEmitter<IPosition>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public feildOnClick() {
    this.router.navigate(['/game/city', this.cityObj.id]);
    this.moveOnField.emit({x: this.cityObj.x, y: this.cityObj.y});
  }
}
