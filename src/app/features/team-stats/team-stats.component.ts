import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { NbaService } from '../../nba.service';
import { Game, Stats, Team } from '../../data.models';
import { ModalService } from 'src/app/core/service/modal.service';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnInit {
  @Input() team!: Team;

  @ViewChild('modal') modal!: TemplateRef<unknown>;

  games$!: Observable<Game[]>;
  stats!: Stats;

  constructor(
    private modalService: ModalService,
    protected nbaService: NbaService,
  ) { }

  ngOnInit(): void {
    this.games$ = this.nbaService.getLastResults(this.team, 12).pipe(
      tap(games => this.stats = this.nbaService.getStatsFromGames(games, this.team))
    )
  }

  remove(team: Team) {
    this.modalService.display({
      template: this.modal,
      actions: [
        { label: 'No' },
        { label: 'Yes', action: () => this.nbaService.removeTrackedTeam(team) },
      ],
    });
  }
}
