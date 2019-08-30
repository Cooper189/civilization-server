import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { FieldComponent } from './field/field.component';
import { GameRoutingModule } from './game.routing.module';
import { UnitFieldComponent } from './unit-field/unit-field.component';
import { UnitDirective } from './directives/unit.directive';
import { InfoTabComponent } from './info-tab/info-tab.component';
import { CityComponent } from './city/city.component';
import { AddImageDirective } from './directives/image/add-image.directive';
import { SocketService } from './services/socket.service';
import { CityPageComponent } from './city-page/city-page.component';
import { ListOfBuildindsComponent } from './list-of-buildinds/list-of-buildinds.component';


@NgModule({
  declarations: [
    GameComponent,
    FieldComponent,
    UnitFieldComponent,
    UnitDirective,
    InfoTabComponent,
    CityComponent,
    AddImageDirective,
    CityPageComponent,
    ListOfBuildindsComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule
  ],
  providers: [SocketService]
})
export class GameModule { }
