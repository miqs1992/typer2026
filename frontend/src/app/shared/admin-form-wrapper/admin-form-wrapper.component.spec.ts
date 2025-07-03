import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminFormWrapperComponent } from './admin-form-wrapper.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

const formGroup = new FormGroup({
  name: new FormControl('', {
    validators: [Validators.required, Validators.minLength(2)],
  }),
});

describe('[Component] Admin Form Wrapper', () => {
  let component: AdminFormWrapperComponent;
  let fixture: ComponentFixture<AdminFormWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminFormWrapperComponent,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFormWrapperComponent);

    fixture.componentRef.setInput('formGroup', formGroup);
    fixture.componentRef.setInput('submitText', 'Submit');

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit formSubmit when form is valid', () => {
    spyOn(component.formSubmit, 'emit');

    formGroup.setValue({ name: 'Valid Name' });
    component.onSubmitInternal();

    expect(component.formSubmit.emit).toHaveBeenCalled();
  });

  it('should not emit formSubmit when form is invalid', () => {
    spyOn(component.formSubmit, 'emit');

    formGroup.setValue({ name: '' });
    component.onSubmitInternal();

    expect(component.formSubmit.emit).not.toHaveBeenCalled();
  });

  it('should disable submit when isSubmitDisabled is true', () => {
    fixture.componentRef.setInput('isSubmitDisabled' ,true);
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });

  it('should set link on cancel', () => {
    fixture.componentRef.setInput('cancelLink', '/cancel');
    fixture.detectChanges();

    const cancelButton = fixture.nativeElement.querySelector('a.cancel-link');
    expect(cancelButton.getAttribute('href')).toBe('/cancel');
  })
});
