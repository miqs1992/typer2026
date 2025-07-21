import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousDay } from './previous-day';
import { of } from 'rxjs';
import { mockedNextMatchDay } from '../betting.mock';
import { BettingService } from '../betting.service';

describe('PreviousDay', () => {
  let component: PreviousDay;
  let fixture: ComponentFixture<PreviousDay>;
  let bettingServiceSpy = jasmine.createSpyObj('BettingService', ['getPreviousMatchDay']);
  bettingServiceSpy.getPreviousMatchDay.and.returnValue(of(mockedNextMatchDay));


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviousDay],
      providers: [
        {
          provide: BettingService,
          useValue: bettingServiceSpy,
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousDay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch previous match day on init', () => {
    expect(bettingServiceSpy.getPreviousMatchDay).toHaveBeenCalled();
    expect(component.matchDay()).toEqual(mockedNextMatchDay.matchDay);
  });
});
