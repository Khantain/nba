import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectModule } from '../../shared/inputs/select/select.module';
import { SearchTeamModule } from '../search-team/search-team.module';
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
    SearchTeamModule,
    SelectModule
  ]
})
export class GameStatsModule { }
