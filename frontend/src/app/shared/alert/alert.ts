import { Component, Output, EventEmitter, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

@Component({
  selector: 'app-alert',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './alert.html',
  styleUrl: './alert.scss'
})
export class Alert {
  type = input<AlertType>('info');
  description = input<string | undefined>(undefined);
  showIcon = input(true);
  closable = input(false);
  banner = input(false);

  @Output() close = new EventEmitter<void>();

  getIcon(): string {
    switch (this.type()) {
      case 'success': return 'check_circle';
      case 'info': return 'info';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'info';
    }
  }

  onClose(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.close.emit();
  }
}
