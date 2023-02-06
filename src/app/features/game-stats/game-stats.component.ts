import { Component } from '@angular/core';
import { first, map, Observable, Subject, tap } from 'rxjs';
import { Team } from 'src/app/data.models';
import { NbaService } from 'src/app/nba.service';
import { Conference } from 'src/app/shared/interfaces/conference.interface';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css']
})
export class GameStatsComponent {
  private teamsSubject = new Subject<void>();

  teams$: Observable<Team[]> = this.teamsSubject.pipe(
    map(() => {
      if (this.selectedConference)
        return this.allTeams.filter(t => t.conference === this.selectedConference?.value)
      return this.allTeams;
    })
  );

  conferences$: Observable<Conference[]> = this.nbaService.getConferences();

  selectedTeam: Team | null = null;
  selectedConference: Conference | null = null;
  allTeams: Team[] = [];

  constructor(protected nbaService: NbaService) {
  }

  ngOnInit() {
    this.nbaService.getAllTeams().pipe(
      first(),
      tap(teams => {
        this.allTeams = teams;
        this.updateAvailableTeams();
      }),
    ).subscribe();
  }

  trackTeam(): void {
    if (this.selectedTeam)
      this.nbaService.addTrackedTeam(this.selectedTeam);
  }

  setTeam(team: Team) {
    this.selectedTeam = team;
  }

  onConferenceChange(selectedConference: Conference) {
    this.selectedConference = selectedConference;
    this.updateAvailableTeams();
  }

  private updateAvailableTeams() {
    this.teamsSubject.next();
  }
}
