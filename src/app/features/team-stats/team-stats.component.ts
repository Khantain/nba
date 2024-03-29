import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ModalService } from '../../core/modal/modal.service';
import { NbaService } from '../../core/services/nba.service';
import { Game, Stats, Team } from '../../shared/interfaces/data.models';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnInit {
  @Input() team!: Team;

  @ViewChild('modal') modal!: TemplateRef<unknown>;
  @ViewChild('noButton') noButtonTemplate!: TemplateRef<unknown>;
  @ViewChild('yesButton') yesButtontemplate!: TemplateRef<unknown>;

  games$!: Observable<Game[]>;
  stats!: Stats;

  constructor(
    private modalService: ModalService,
    protected nbaService: NbaService,
  ) { }

  ngOnInit(): void {
    this.games$ = this.nbaService.getLastResults(this.team).pipe(
      tap(games => this.stats = this.nbaService.getStatsFromGames(games, this.team)),
    );
  }

  remove(team: Team) {
    this.modalService.display({
      template: this.modal,
      actions: [
        { template: this.noButtonTemplate },
        { template: this.yesButtontemplate, action: () => this.nbaService.removeTrackedTeam(team) },
      ],
    });
  }
}
