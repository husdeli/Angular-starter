import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppComponent } from './app.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { TrafficMeisterStore } from './domain';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MainComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let errorSubject$: Subject<Error>;
  let retryActionSubject$: Subject<void>;
  let openSnackBarSpy: jasmine.Spy;
  let retrySpy: jasmine.Spy;

  beforeEach(async () => {
    errorSubject$ = new Subject();
    retryActionSubject$ = new Subject();
    const fakeStore = {
      error$: errorSubject$.asObservable(),
      retry: jasmine.createSpy('retry'),
    } as unknown as TrafficMeisterStore;
    const fakeSnackbar = {
      open: jasmine.createSpy('open').and.returnValue({
        onAction: () => retryActionSubject$.asObservable(),
      }),
    } as unknown as MatSnackBar;
    openSnackBarSpy = fakeSnackbar.open as jasmine.Spy;
    retrySpy = fakeStore.retry as jasmine.Spy;

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [MatProgressBarModule],
      providers: [
        { provide: TrafficMeisterStore, useValue: fakeStore },
        { provide: MatSnackBar, useValue: fakeSnackbar },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show snackbar with "Retry" action in case of error happened', async () => {
    errorSubject$.next(new Error());
    expect(openSnackBarSpy).toHaveBeenCalledWith('Error', 'Retry');
  });

  it('should retry data fetching', () => {
    errorSubject$.next(new Error());
    retryActionSubject$.next();
    expect(retrySpy).toHaveBeenCalled();
  });
});
