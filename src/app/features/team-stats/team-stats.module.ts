import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
    RouterModule,
  ]
})
export class TeamStatsModule { }
