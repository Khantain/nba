import { Injectable } from "@angular/core";
import { forkJoin, Observable, Subject, tap } from "rxjs";
import { Team } from "src/app/data.models";
import { NbaService } from "src/app/nba.service";
import { Conference } from "src/app/shared/interfaces/conference.interface";
import { Division } from "src/app/shared/interfaces/division.interface";

@Injectable()
export class SearchTeamService {
  conferences$: Observable<Conference[]> = this.nbaService.getConferences();

  private divisionsSubject = new Subject<Division[]>();
  divisions$: Observable<Division[]> = this.divisionsSubject.asObservable();

  private teamsSubject = new Subject<Team[]>();
  teams$: Observable<Team[]> = this.teamsSubject.asObservable();

  private allDivisions: Division[] = [];
  private selectedDivision: Division | null = null;

  private allTeams: Team[] = [];
  private selectedConference: Conference | null = null;


  constructor(protected nbaService: NbaService) {
    this.init().subscribe();
  }

  private init(): Observable<[Team[], Division[]]> {
    return this.loadData().pipe(
      tap(() => {
        this.updateDivisions();
        this.updateTeams();
      })
    );
  }

  private loadData(): Observable<[Team[], Division[]]> {
    return forkJoin([this.loadTeams(), this.loadDivisions()]);
  }

  private loadTeams(): Observable<Team[]> {
    return this.nbaService.getAllTeams().pipe(
      tap(teams => this.allTeams = teams),
    );
  }

  private loadDivisions(): Observable<Division[]> {
    return this.nbaService.getDivisions().pipe(
      tap(divisions => this.allDivisions = divisions),
    );
  }

  private updateDivisions() {
    this.divisionsSubject.next(this.getFilteredDivisions());
  }

  private getFilteredDivisions(): Division[] {
    if (this.selectedConference)
      return this.allDivisions.filter(d => d.conference === this.selectedConference?.value)

    return this.allDivisions;
  }

  private updateTeams() {
    this.teamsSubject.next(this.getFilteredTeams());
  }

  private getFilteredTeams(): Team[] {
    if (this.selectedDivision)
      return this.allTeams.filter(t => t.division === this.selectedDivision?.value)

    if (this.selectedConference)
      return this.allTeams.filter(t => t.conference === this.selectedConference?.value)

    return this.allTeams;
  }

  onConferenceChange(selectedConference: Conference) {
    this.selectedConference = selectedConference;
    this.updateDivisions();
    this.updateTeams();
  }

  onDivisionChange(selectedDivision: Division) {
    this.selectedDivision = selectedDivision;
    this.updateTeams();
  }
}
