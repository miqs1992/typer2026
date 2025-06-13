import { Component, input, output, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export type TagColor = 'success' | 'processing' | 'error' | 'warning' | 'default' | string; // string for custom hex/rgb colors

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './tag.html',
  styleUrl: './tag.scss'
})
export class TagComponent {
  color = input<TagColor>('default');
  closable = input(false);

  onClose = output<MouseEvent>();

  @HostBinding('class.app-tag') hostClass = true;
  @HostBinding('class.app-tag-closable') get isClosable() {
    return this.closable();
  }

  // Predefined colors mapping to CSS classes
  private predefinedColorMap: Record<string, string> = {
    success: 'app-tag-success',
    processing: 'app-tag-processing',
    error: 'app-tag-error',
    warning: 'app-tag-warning',
    default: 'app-tag-default',
  };

  @HostBinding('class') get colorClass(): string {
    const colorValue = this.color();
    return this.predefinedColorMap[colorValue] || '';
  }

  @HostBinding('style.background-color') get customBackgroundColor(): string | null {
    const colorValue = this.color();
    return !this.predefinedColorMap[colorValue] ? colorValue : null;
  }

  @HostBinding('style.border-color') get customBorderColor(): string | null {
    const colorValue = this.color();
    return !this.predefinedColorMap[colorValue] ? colorValue : null;
  }


  handleClose(event: MouseEvent): void {
    if (this.closable()) {
      this.onClose.emit(event);
    }
  }
}

