import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { IField, IUnit, ICity, IPosition } from '../game.interface';




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public fieldMatrix: Array<Array<IField>>;
  public units = [];
  public processingEvent: IUnit;
  public citys = [];

  constructor(private service: SocketService) {
    this.service.matrix.subscribe((item: Array<Array<IField>>) => {
      this.fieldMatrix = item;
    });
    this.service.unit.subscribe((units: Array<IUnit>) => {
      this.units = units;
    });
    this.service.city.subscribe((city: Array<ICity>) => {
      this.citys = city;
    });
  }

  ngOnInit() {
    this.service.socket.emit('rebase');
  }

  public processing(event: IField) {
    if (this.processingEvent) {
      this.service.socket.emit('unitCanMove', {from: this.processingEvent, to: event});
      this.processingEvent = null;
    }
  }

  public processingAdd(event) {
    this.processingEvent = event;
  }

  public createCity() {
    if (this.processingEvent.type) {
      this.service.socket.emit('createCity', this.processingEvent);
      this.processingEvent = null;
    }
  }

  public saveGame() {
    this.service.socket.emit('save');
  }

  public createBuilding() {
    if (this.processingEvent.type) {
      this.service.socket.emit('createBuilding', this.processingEvent);
      this.service.socket.on('createBuilding', (item: IField) => {
        this.fieldMatrix[item.x][item.y] = item;
      });
      this.processingEvent = null;
    }
  }

  public nextMove() {
    this.service.socket.emit('nextMove');
  }
}
