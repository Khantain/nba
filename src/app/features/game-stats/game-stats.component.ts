import { Component } from '@angular/core';
import { Team } from 'src/app/shared/interfaces/data.models';
import { NbaService } from 'src/app/nba.service';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css']
})
export class GameStatsComponent {
  selectedTeam: Team | undefined;
  numberOfDaysOptions$ = this.nbaService.getNumberOfDaysForResultsOptions();

  constructor(protected nbaService: NbaService) { }

  trackTeam(): void {
    if (this.selectedTeam)
      this.nbaService.addTrackedTeam(this.selectedTeam);
  }

  setTeam(team: Team) {
    this.selectedTeam = team;
  }

}
