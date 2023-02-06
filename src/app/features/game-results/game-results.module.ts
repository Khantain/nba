import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GameResultsRoutingModule } from './game-results-routing.module';
import { GameResultsComponent } from './game-results.component';


@NgModule({
  declarations: [
    GameResultsComponent,
  ],
  exports: [
    GameResultsComponent,
  ],
  imports: [
    CommonModule,
    GameResultsRoutingModule,
  ]
})
export class GameResultsModule { }
