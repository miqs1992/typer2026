import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FormControl } from '@angular/forms';
import { PlayerSelectorComponent } from './player-selector.component';
import { mockPlayers } from '../selector.mock';

const control = new FormControl('');

describe('[Component] Player Selector', () => {
  let component: PlayerSelectorComponent;
  let fixture: ComponentFixture<PlayerSelectorComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PlayerSelectorComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PlayerSelectorComponent);
    fixture.componentRef.setInput('control', control);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    httpTestingController.expectOne('teams/players');
  });

  it('should load players on init', () => {
    const req = httpTestingController.expectOne('teams/players');
    expect(req.request.method).toBe('GET');
    req.flush({ items: mockPlayers });

    expect(component.items().length).toBe(2);
    expect(component.items()[0].name).toBe('Pl1');

    expect(component.isLoading()).toBeFalse();
    expect(component.error()).toBeNull();
  })
});
