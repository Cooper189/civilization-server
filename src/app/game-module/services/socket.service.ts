import { Injectable } from '@angular/core';
import { GameModule } from '../game.module';

import * as io from 'socket.io-client';
import { Subject, BehaviorSubject } from 'rxjs';


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
    console.log('socket');
    this.socket = io(this.url, connectionOptions);
    this.socket.emit('user', {user: '1111'});
    this.socket.on('getMatrix', (message) => {
        this.matrix.next(message);
    });
    this.socket.on('unit', (message) => {
        this.unit.next(message);
    });
    this.socket.on('city', (message) => {
      this.city.next(message);
    });
  }
}
