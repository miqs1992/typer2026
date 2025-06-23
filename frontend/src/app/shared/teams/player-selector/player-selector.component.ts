import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PublicPlayer } from '../selector.model';
import { NgOptionComponent, NgSelectComponent, } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FlagIcon } from '../../flag-icon/flag-icon';
import { BaseSelectorComponent } from '../base-selector/base-selector.component';

@Component({
  selector: 'app-player-selector',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectComponent,
    NgOptionComponent,
    FlagIcon,
  ],
  templateUrl: './player-selector.component.html',
  styleUrls: ['./player-selector.component.scss'],
})
export class PlayerSelectorComponent extends BaseSelectorComponent<PublicPlayer> implements OnInit {
  searchPath = 'teams/players';
}
