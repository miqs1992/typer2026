import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting, } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { UsersService } from './users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('[Service] Users Service', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const snackBarSpyObj = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      providers: [
        UsersService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MatSnackBar, useValue: snackBarSpyObj }
      ],
    }).compileComponents();

    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should update profile', () => {
    const payload = {
      winnerId: '#winnerIdUUID',
      topScorerId: '#topScorerIdUUID'
    };
    service.updateProfile(payload).subscribe();

    const req = httpTestingController.expectOne('users/me');
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(payload);
    req.flush(null);
  });

  it('should show snackbar when update profile fails', () => {
    const payload = {
      winnerId: '#winnerIdUUID',
      topScorerId: '#topScorerIdUUID'
    };

    service.updateProfile(payload).subscribe({
      next: () => fail('Expected error but got success'),
      error: (error) => {
        expect(error.status).toBe(422);
      }
    });

    const req = httpTestingController.expectOne('users/me');
    req.flush('Validation Error', {
      status: 422,
      statusText: 'Provided payload is invalid'
    });

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Failed to update profile. Please try again.',
      'Close',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      }
    );
  });
});
