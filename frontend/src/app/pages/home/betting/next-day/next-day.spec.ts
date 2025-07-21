import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextDay } from './next-day';
import { of } from 'rxjs';
import { BettingService } from '../betting.service';
import { mockedNextMatchDay } from '../betting.mock';

describe('NextDay', () => {
  let component: NextDay;
  let fixture: ComponentFixture<NextDay>;
  let bettingServiceSpy = jasmine.createSpyObj('BettingService', ['getNextMatchDay']);
  bettingServiceSpy.getNextMatchDay.and.returnValue(of(mockedNextMatchDay));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextDay],
      providers: [
        {
          provide: BettingService,
          useValue: bettingServiceSpy,
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextDay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch next match day on init', () => {
    expect(bettingServiceSpy.getNextMatchDay).toHaveBeenCalled();
    expect(component.matchDay()).toEqual(mockedNextMatchDay.matchDay);
  });
});
