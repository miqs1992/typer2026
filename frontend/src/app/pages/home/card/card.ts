import { Component, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home-card',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  title = input.required<string>();
  content = input.required<string>();
  icon = input.required<string>();
}
