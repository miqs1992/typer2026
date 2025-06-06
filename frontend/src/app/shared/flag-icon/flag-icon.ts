import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-flag-icon',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './flag-icon.html',
  styleUrl: './flag-icon.scss'
})
export class FlagIcon {
  country = input.required<string>();
}
