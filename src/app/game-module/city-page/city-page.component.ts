import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-city-page',
  templateUrl: './city-page.component.html',
  styleUrls: ['./city-page.component.scss']
})
export class CityPageComponent implements OnInit {
  public state$: any;
  public buildings: any;

  constructor(private route: ActivatedRoute, private service: SocketService) {
    this.service.socket.on('cityData', (data) => {
      this.state$ = data;
    });
    this.service.socket.on('available', (buildings) => {
      this.buildings = buildings;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(cityId => {
      this.service.socket.emit('cityData', cityId);
    });
  }

  public addToProd(building) {
    this.service.socket.emit('addToProd', {build: building, id: this.state$.id});
  }
}
