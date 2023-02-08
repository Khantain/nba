import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Game, Team } from 'src/app/data.models';
import { NbaService } from 'src/app/nba.service';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent {

  team?: Team;
  games$?: Observable<Game[]>;

  constructor(private activatedRoute: ActivatedRoute, protected nbaService: NbaService) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.team = this.nbaService.getTrackedTeams().find(team => team.abbreviation === paramMap.get("teamAbbr"));
      if (this.team)
        this.games$ = this.nbaService.getLastResults(this.team);
    })
  }

}
