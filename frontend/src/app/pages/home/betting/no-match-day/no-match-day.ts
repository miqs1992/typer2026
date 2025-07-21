import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-no-match-day',
  imports: [
    MatIcon,
  ],
  templateUrl: './no-match-day.html',
  styleUrl: './no-match-day.scss'
})
export class NoMatchDay {
  title = input.required<string>();
}
