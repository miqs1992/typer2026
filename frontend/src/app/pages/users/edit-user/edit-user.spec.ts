import { EditUser } from './edit-user';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { currentUserMock } from '../../../auth/auth.mock';
import { UsersService } from '../users.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamSelectorComponent } from '../../../shared/teams/team-selector/team-selector.component';
import { PlayerSelectorComponent } from '../../../shared/teams/player-selector/player-selector.component';
import { MockPlayerSelectorComponent, MockTeamSelectorComponent } from '../../../shared/teams/selector.mock';

describe('[Component] Edit user', () => {
  let component: EditUser;
  let fixture: ComponentFixture<EditUser>;
  let usersServiceSpy = jasmine.createSpyObj('UsersService', ['updateProfile']);
  usersServiceSpy.updateProfile.and.returnValue(of());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              currentUser: currentUserMock,
              isBeforeFirstGame: true,
            })
          },
        },
        {
          provide: UsersService,
          useValue: usersServiceSpy,
        },
      ]
    })
    .overrideComponent(EditUser, {
      remove: {
        imports: [
          TeamSelectorComponent,
          PlayerSelectorComponent,
        ]
      },
      add: {
        imports: [
          MockTeamSelectorComponent,
          MockPlayerSelectorComponent,
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call usersService when form is submitted', () => {
    component.form.patchValue({
      winnerId: 'team-id',
      topScorerId: 'player-id'
    });

    expect(component.form.valid).toBeTrue();

    component.onSubmit();

    expect(usersServiceSpy.updateProfile).toHaveBeenCalledWith({
      winnerId: 'team-id',
      topScorerId: 'player-id',
    });
  });
});
