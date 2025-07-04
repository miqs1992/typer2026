import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PublicTeam } from '../selector.model';
import { NgOptionComponent, NgSelectComponent, } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FlagIcon } from '../../flag-icon/flag-icon';
import { BaseSelectorComponent } from '../base-selector/base-selector.component';

@Component({
  selector: 'app-team-selector',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectComponent,
    NgOptionComponent,
    FlagIcon,
  ],
  templateUrl: './team-selector.component.html',
  styleUrls: ['./team-selector.component.scss'],
})
export class TeamSelectorComponent extends BaseSelectorComponent<PublicTeam> implements OnInit {
  searchPath = 'teams';
}
