import { Injectable } from '@angular/core';
import { GameModule } from '../game.module';

import * as io from 'socket.io-client';
import { Subject } from 'rxjs';
import { IField, IUnit, ICity } from '../game.interface';


const connectionOptions =  {
  'force new connection' : true,
  reconnectionAttempts: 'Infinity',
  timeout : 10000,
  transports : ['websocket'],
  extraHeaders: {
    Authorization: '1111'
  }
};

@Injectable()
export class SocketService {
  private url = '/';
  public socket;
  public matrix = new Subject<any>();
  public unit = new Subject<any>();
  public city = new Subject<any>();

  constructor() {
    this.socket = io(this.url, connectionOptions);
    this.socket.emit('user', {user: '1111'});

    this.socket.on('getMatrix', (message: Array<Array<IField>>) => {
        this.matrix.next(message);
    });

    this.socket.on('unit', (message: Array<IUnit>) => {
        this.unit.next(message);
    });

    this.socket.on('city', (message: Array<ICity>) => {
      this.city.next(message);
    });
  }
}
