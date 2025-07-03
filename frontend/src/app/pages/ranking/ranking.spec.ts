import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ranking } from './ranking';
import { of } from 'rxjs';
import { mockRanking } from './ranking.mock';
import { RankingService } from './ranking.service';
import { ActivatedRoute } from '@angular/router';
import { currentUserMock } from '../../auth/auth.mock';
import { RankedUserData } from './ranking.model';


describe('[Component] Ranking', () => {
  let component: Ranking;
  let fixture: ComponentFixture<Ranking>;

  const rankingWithCurrentUser: RankedUserData[] = [
    ...mockRanking,
    {
      id: currentUserMock.id,
      username: currentUserMock.firstName + ' ' + currentUserMock.lastName,
      points: currentUserMock.points,
      exactBetCount: currentUserMock.exactBetCount,
      winner: null,
      leagueRank: 3,
      topScorer: null
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ranking],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ currentUser: currentUserMock }) },
        },
        {
          provide: RankingService,
          useValue: { getRanking: () => of(rankingWithCurrentUser)},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Ranking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch ranking on init', () => {
    expect(component.ranking()).toEqual(rankingWithCurrentUser);
    expect(component.isFetching()).toBeFalse();
    expect(component.error()).toBeNull();
  });

  it('should display row for each user in ranking', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(rankingWithCurrentUser.length);

    rankingWithCurrentUser.forEach((user, index) => {
      const row = rows[index];
      expect(row.textContent).toContain(user.username);
      expect(row.textContent).toContain(user.points.toString());
      expect(row.textContent).toContain(user.exactBetCount.toString());
      if (user.winner) {
        expect(row.textContent).toContain(user.winner.name);
      }
      if (user.topScorer) {
        expect(row.textContent).toContain(user.topScorer.name);
      }
    });
  });

  it('marks current user in ranking', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(rows[0]).not.toHaveClass('current');
    expect(rows[1]).not.toHaveClass('current');
    expect(rows[2]).toHaveClass('current');
  })

  describe('compact mode', () => {
    it('should not display winner and top scorer in compact mode', () => {
      fixture.componentRef.setInput('isCompact', true);
      fixture.detectChanges();

      const headerRow = fixture.nativeElement.querySelector('thead tr');
      expect(headerRow.textContent).not.toContain('Winner');
      expect(headerRow.textContent).not.toContain('Top Scorer');

      const displayedColumns = component.displayedColumns();
      expect(displayedColumns).toEqual(['rank', 'name', 'points', 'exact']);
    });

    it('should display winner and top scorer in expanded mode', () => {
      const headerRow = fixture.nativeElement.querySelector('thead tr');
      expect(headerRow.textContent).toContain('Winner');
      expect(headerRow.textContent).toContain('Top Scorer');

      const displayedColumns = component.displayedColumns();
      expect(displayedColumns).toEqual(['rank', 'name', 'points', 'exact', 'topScorer', 'winner']);
    });
  });
});
