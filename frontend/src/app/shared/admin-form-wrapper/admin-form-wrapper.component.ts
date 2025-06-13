import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-form-wrapper',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, RouterLink],
  templateUrl: './admin-form-wrapper.component.html',
  styleUrls: ['./admin-form-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminFormWrapperComponent {
  formGroup = input.required<FormGroup>();
  submitText = input.required<string>();
  isSubmitDisabled = input<boolean>(false);
  cancelLink = input<string | any[]>(['..']);

  formSubmit = output<void>();

  onSubmitInternal(): void {
    if (this.formGroup().invalid) {
      console.log('Form is invalid');
      return;
    }

    this.formSubmit.emit();
  }
}

