import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StopBetTimeService } from './stop-bet-time.service';

describe('[Service] StopBetTime Service', () => {
  let service: StopBetTimeService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        StopBetTimeService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    service = TestBed.inject(StopBetTimeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('getNextStopBetTime', () => {
    it('should return the stop bet time from the next match day', () => {
      const stopBetTime = new Date('2023-10-01T12:00:00Z');

      service.getNextStopBetTime().subscribe((result) => {
        expect(result).toEqual(stopBetTime);
      });

      const req = httpTestingController.expectOne('match-days/next');
      expect(req.request.method).toBe('GET');
      req.flush( { stopBetTime: stopBetTime.toISOString() } );
    });

    it('should return null if no match day is found', () => {
      service.getNextStopBetTime().subscribe((result) => {
        expect(result).toBeNull();
      });

      const req = httpTestingController.expectOne('match-days/next');
      expect(req.request.method).toBe('GET');
      req.flush(null);
    });
  })

  describe('getIsBeforeFirstGame', () => {
    it('should return true if it is before the first game', () => {
      service.getIsBeforeFirstGame().subscribe((result) => {
        expect(result).toBeTrue();
      });

      const req = httpTestingController.expectOne('match-days/first');
      expect(req.request.method).toBe('GET');
      req.flush({ isBeforeFirstGame: true });
    });

    it('should return false if it is not before the first game', () => {
      service.getIsBeforeFirstGame().subscribe((result) => {
        expect(result).toBeFalse();
      });

      const req = httpTestingController.expectOne('match-days/first');
      expect(req.request.method).toBe('GET');
      req.flush({ isBeforeFirstGame: false });
    });

    it('should handle errors and default to true', () => {
      service.getIsBeforeFirstGame().subscribe((result) => {
        expect(result).toBeTrue();
      });

      const req = httpTestingController.expectOne('match-days/first');
      expect(req.request.method).toBe('GET');
      req.flush(null, { status: 404, statusText: 'Match day not found' });
    });
  })
})
