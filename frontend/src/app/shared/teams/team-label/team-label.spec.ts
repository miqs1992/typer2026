import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLabel } from './team-label';
import { ReplaySubject } from 'rxjs';
import { PublicTeam } from '../selector.model';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

const mockedTeam: PublicTeam = {
  id: '1',
  name: 'Poland',
  flag: 'pl'
}

describe('TeamLabel', () => {
  let component: TeamLabel;
  let fixture: ComponentFixture<TeamLabel>;

  class MockBreakpointObserver {
    private subject = new ReplaySubject<Pick<BreakpointState, 'matches'>>(1);

    // This method is called by the component
    observe() {
      return this.subject.asObservable();
    }

    // You can call this in tests to simulate screen changes
    setMatches(matches: boolean) {
      this.subject.next({ matches });
    }
  }

  const mockBreakpointObserver = new MockBreakpointObserver();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamLabel],
      providers: [
        { provide: BreakpointObserver, useValue: mockBreakpointObserver }
       ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamLabel);
    fixture.componentRef.setInput('team', mockedTeam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on mobile view', () => {
    beforeEach(() => {
      mockBreakpointObserver.setMatches(true);
      fixture.detectChanges();
    })

    it('should only display flag', () => {
      const flag = fixture.nativeElement.querySelector('app-flag-icon');
      expect(flag).toBeTruthy();
      expect(fixture.nativeElement.textContent).not.toContain(mockedTeam.name);
    })

    it('should display team name when forceShowName is true', () => {
      fixture.componentRef.setInput('forceShowName', true);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain(mockedTeam.name);
    })
  });

  describe('on non-mobile view', () => {
    beforeEach(() => {
      mockBreakpointObserver.setMatches(false);
      fixture.detectChanges();
    })

    it('should display team name and flag', () => {
      const flag = fixture.nativeElement.querySelector('app-flag-icon');
      expect(flag).toBeTruthy();
      expect(fixture.nativeElement.textContent).toContain(mockedTeam.name);
    })
  });
});
