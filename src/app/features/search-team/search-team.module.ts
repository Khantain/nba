import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchTeamComponent } from './search-team.component';
import { SelectModule } from '../../shared/inputs/select/select.module';

@NgModule({
  declarations: [
    SearchTeamComponent,
  ],
  exports: [
    SearchTeamComponent,
  ],
  imports: [
    CommonModule,
    SelectModule,
  ]
})
export class SearchTeamModule { }
