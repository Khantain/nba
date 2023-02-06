import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
  ]
})
export class GameStatsModule { }
