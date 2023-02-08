import { Component, EventEmitter, Output } from '@angular/core';
import { Team } from '../../shared/interfaces/data.models';
import { SearchTeamService } from './search-team.service';

@Component({
  selector: 'app-search-team',
  templateUrl: './search-team.component.html',
  styleUrls: ['./search-team.component.css'],
  providers: [SearchTeamService],
})
export class SearchTeamComponent {
  @Output() teamSelected = new EventEmitter<Team>();

  constructor(protected service: SearchTeamService) { }

  setTeam(team: Team) {
    this.teamSelected.emit(team);
  }
}
