import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './layout/navbar/navbar';
import {Container} from './layout/container/container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Container],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Euro Typer 2026';
}
