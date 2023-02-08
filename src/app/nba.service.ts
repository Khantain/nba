import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format, subDays } from 'date-fns';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { Game, Stats, Team } from './shared/interfaces/data.models';
import { Conference } from './shared/interfaces/conference.interface';
import { Division } from './shared/interfaces/division.interface';

@Injectable({
  providedIn: 'root'
})
export class NbaService {
  private headers = {
    'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
  };
  private API_URL = "https://free-nba.p.rapidapi.com";

  private numberOfDaysSubject = new BehaviorSubject<number>(12);
  numberOfDays$ = this.numberOfDaysSubject.asObservable();

  trackedTeams: Team[] = [];

  constructor(private http: HttpClient) { }

  addTrackedTeam(team: Team): void {
    this.trackedTeams.push(team);
  }

  setNumberOfDays(numberOfDays: number) {
    this.numberOfDaysSubject.next(numberOfDays);
  }

  removeTrackedTeam(team: Team): void {
    const index = this.trackedTeams.findIndex(t => t.id == team.id);
    this.trackedTeams.splice(index, 1);
  }

  getTrackedTeams(): Team[] {
    return this.trackedTeams;
  }

  getAllTeams(): Observable<Team[]> {
    return this.http.get<{ data: Team[] }>(`${this.API_URL}/teams?page=0`,
      { headers: this.headers }).pipe(
        map(res => res.data),
      );
  }

  getLastResults(team: Team): Observable<Game[]> {
    return this.numberOfDays$.pipe(
      switchMap(days => {
        return this.http.get<{ meta: unknown, data: Game[] }>(
          `${this.API_URL}/games?page=0${this.getDaysQueryString(days)}`,
          { headers: this.headers, params: { per_page: 12, "team_ids[]": "" + team.id } }
        );
      }),
      map(res => res.data)
    );
  }

  getStatsFromGames(games: Game[], team: Team): Stats {
    const stats: Stats = { wins: 0, losses: 0, averagePointsScored: 0, averagePointsConceded: 0, lastGames: [] };
    games.forEach(game => {
      const gameStats = this.getSingleGameStats(team, game);
      stats.wins += gameStats.wins;
      stats.losses += gameStats.losses;
      stats.averagePointsConceded += gameStats.averagePointsConceded;
      stats.averagePointsScored += gameStats.averagePointsScored;
      stats.lastGames.push(gameStats.wins == 1 ? 'W' : 'L');
    });
    stats.averagePointsScored = Math.round(stats.averagePointsScored / games.length);
    stats.averagePointsConceded = Math.round(stats.averagePointsConceded / games.length);
    return stats;
  }

  private getDaysQueryString(nbOfDays = 12): string {
    let qs = "";
    for (let i = 1; i < nbOfDays; i++) {
      const date = format(subDays(new Date(), i), "yyyy-MM-dd")
      qs = qs.concat("&dates[]=" + date);
    }
    return qs;
  }

  private getSingleGameStats(team: Team, game: Game): Stats {
    const stats: Stats = { wins: 0, losses: 0, averagePointsScored: 0, averagePointsConceded: 0, lastGames: [] };
    if (game.home_team.id === team.id) {
      stats.averagePointsScored = game.home_team_score;
      stats.averagePointsConceded = game.visitor_team_score;
      if (game.home_team_score > game.visitor_team_score) {
        stats.wins += 1;
      } else {
        stats.losses += 1;
      }
    }
    if (game.visitor_team.id === team.id) {
      stats.averagePointsScored = game.visitor_team_score;
      stats.averagePointsConceded = game.home_team_score;
      if (game.visitor_team_score > game.home_team_score) {
        stats.wins = 1;
      } else {
        stats.losses = 1;
      }
    }
    return stats;
  }

  getConferences(): Observable<Conference[]> {
    return of([
      { label: 'Western Conference', value: 'West' },
      { label: 'Eastern Conference', value: 'East' },
    ])
  }

  getDivisions(): Observable<Division[]> {
    return of([
      { label: 'Atlantic Division', value: 'Atlantic', conference: 'East' },
      { label: 'Central Division', value: 'Central', conference: 'East' },
      { label: 'Southeast Division', value: 'Southeast', conference: 'East' },
      { label: 'Northwest Division', value: 'Northwest', conference: 'West' },
      { label: 'Pacific Division', value: 'Pacific', conference: 'West' },
      { label: 'Southwest Division', value: 'Southwest', conference: 'West' },
    ])
  }

  getNumberOfDaysForResultsOptions(): Observable<number[]> {
    return of([6, 12, 20]);
  }
}
