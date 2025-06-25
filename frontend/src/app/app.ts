import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './layout/navbar/navbar';
import {Container} from './layout/container/container';
import { SpinnerService } from './shared/spinner/spinner.service';
import { SpinnerComponent } from './shared/spinner/spinner';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Container, SpinnerComponent, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  spinner = inject(SpinnerService);

  loading$ = this.spinner.loading$;

  protected title = 'Euro Typer 2026';
}
