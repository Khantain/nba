import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Team } from 'src/app/data.models';
import { NbaService } from 'src/app/nba.service';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css']
})
export class GameStatsComponent implements AfterViewInit {

  @ViewChild('optionTemplate') optionTemplate!: TemplateRef<any>;

  teams$: Observable<Team[]> = of([]);
  allTeams: Team[] = [];

  constructor(protected nbaService: NbaService) { }

  ngAfterViewInit() {
    this.teams$ = this.nbaService.getAllTeams().pipe(
      tap(data => this.allTeams = data),
      map(teams => teams.map(t => ({ ...t, template: this.optionTemplate })))
    );
  }

  trackTeam(teamId: string): void {
    let team = this.allTeams.find(team => team.id == Number(teamId));
    if (team)
      this.nbaService.addTrackedTeam(team);
  }
}
