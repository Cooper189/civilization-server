import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { IBuilding, ICity } from '../game.interface';

interface IUserId {
  id: string;
}
@Component({
  selector: 'app-city-page',
  templateUrl: './city-page.component.html',
  styleUrls: ['./city-page.component.scss']
})
export class CityPageComponent implements OnInit {
  public state$: ICity;
  public buildings: Array<IBuilding>;

  constructor(private route: ActivatedRoute, private service: SocketService) {
    this.service.socket.on('cityData', (data: ICity) => {
      this.state$ = data;
    });
    this.service.socket.on('available', (buildings: Array<IBuilding>) => {
      this.buildings = buildings;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((cityId: IUserId) => {
      this.service.socket.emit('cityData', cityId);
    });
  }

  public addToProd(building: IBuilding) {
    this.service.socket.emit('addToProd', {build: building, id: this.state$.id});
  }
}
