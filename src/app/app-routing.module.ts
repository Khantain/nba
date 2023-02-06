import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "results/:teamAbbr",
    loadChildren: () => import('./features/game-results/game-results.module').then(m => m.GameResultsModule),
  },
  {
    path: "**",
    loadChildren: () => import('./features/game-stats/game-stats.module').then(m => m.GameStatsModule),
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
