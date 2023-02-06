import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'src/app/shared/inputs/select/select.module';
import { TeamStatsModule } from '../team-stats/team-stats.module';
import { GameStatsRoutingModule } from './game-stats-routing.module';
import { GameStatsComponent } from './game-stats.component';


@NgModule({
  declarations: [
    GameStatsComponent,
  ],
  exports: [
    GameStatsComponent,
  ],
  imports: [
    CommonModule,
    GameStatsRoutingModule,
    TeamStatsModule,
    SelectModule,
    FormsModule,
  ]
})
export class GameStatsModule { }
