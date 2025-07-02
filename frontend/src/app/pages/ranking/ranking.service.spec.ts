import { TestBed } from '@angular/core/testing';
import { RankingService } from './ranking.service';
import { HttpTestingController, provideHttpClientTesting, } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { mockRanking } from './ranking.mock';

describe('Ranking Service', () => {
  let service: RankingService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        RankingService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    service = TestBed.inject(RankingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should fetch users', () => {
    service.getRanking().subscribe(users => {
      expect(users).toEqual(mockRanking);
    });

    const req = httpTestingController.expectOne('users/ranking');
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.has('limit')).toBeFalse();
    req.flush({ items: mockRanking });
  });

  it('should fetch limited users', () => {
    service.getRanking(5).subscribe(users => {
      expect(users).toEqual(mockRanking);
    });

    const req = httpTestingController.expectOne('users/ranking?limit=5');
    expect(req.request.method).toEqual('GET');
    req.flush({ items: mockRanking });
  });
});
