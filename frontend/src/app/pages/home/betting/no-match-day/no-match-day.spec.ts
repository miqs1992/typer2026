import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMatchDay } from './no-match-day';

describe('NoMatchDay', () => {
  let component: NoMatchDay;
  let fixture: ComponentFixture<NoMatchDay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoMatchDay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoMatchDay);
    fixture.componentRef.setInput('title', 'No Match Day');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('No Match Day');
  });
});
