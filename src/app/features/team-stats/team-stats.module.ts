import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TeamStatsComponent } from './team-stats.component';

@NgModule({
  declarations: [
    TeamStatsComponent,
  ],
  exports: [
    TeamStatsComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class TeamStatsModule { }
