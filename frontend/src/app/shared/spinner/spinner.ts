import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  template: `
    <mat-spinner></mat-spinner>`,
  imports: [
    MatProgressSpinner
  ],
  styleUrls: ['./spinner.scss']
})
export class SpinnerComponent {}
