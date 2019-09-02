import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public fieldMatrix: Array<Array<any>>;
  public units = [];
  public processingEvent: any;
  public citys = [];

  constructor(private service: SocketService) {
    this.service.matrix.subscribe(item => {
      this.fieldMatrix = item;
    });
    this.service.unit.subscribe(units => {
      this.units = units;
    });
    this.service.city.subscribe(city => {
      this.citys = city;
    });
  }

  ngOnInit() {
    this.service.socket.emit('rebase');
  }

  public processing(event) {
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
  public createBuilding() {
    if (this.processingEvent.type) {
      this.service.socket.emit('createBuilding', this.processingEvent);
      this.service.socket.on('createBuilding', (item) => {
        this.fieldMatrix[item.y][item.x] = item;
      });
      this.processingEvent = null;
    }
  }

  public nextMove() {
    this.service.socket.emit('nextMove');
  }
}
