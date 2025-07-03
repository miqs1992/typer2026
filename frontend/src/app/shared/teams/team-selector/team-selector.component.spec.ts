import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TeamSelectorComponent } from './team-selector.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FormControl } from '@angular/forms';
import { mockTeams } from '../selector.mock';

const control = new FormControl('');

describe('[Component] Team Selector', () => {
  let component: TeamSelectorComponent;
  let fixture: ComponentFixture<TeamSelectorComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TeamSelectorComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(TeamSelectorComponent);
    fixture.componentRef.setInput('control', control);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    httpTestingController.expectOne('teams');
  });

  it('should load teams on init', () => {
    const req = httpTestingController.expectOne('teams');
    expect(req.request.method).toBe('GET');
    req.flush({ items: mockTeams });

    expect(component.items().length).toBe(2);
    expect(component.items()[0].name).toBe('Poland');

    expect(component.isLoading()).toBeFalse();
    expect(component.error()).toBeNull();
  })

  it('should load selected team on init', () => {
    control.setValue(mockTeams[0].id);

    httpTestingController.expectOne('teams');
    const req = httpTestingController.expectOne(`teams/${mockTeams[0].id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTeams[0]);

    expect(component.items().length).toBe(1);
  })

  it('should search items based on search term', fakeAsync(() => {
    httpTestingController.expectOne('teams');
    component.searchItems({ term: 'Pol' });
    fixture.detectChanges();
    tick(500);

    const req = httpTestingController.expectOne('teams?search=Pol');
    expect(req.request.method).toBe('GET');
    req.flush(mockTeams);
  }))
});
