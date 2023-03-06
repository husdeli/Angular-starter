import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, take, takeUntil } from 'rxjs';
import { TrafficMeisterStore } from './domain';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  get isLoading$() {
    return this.store.isLoading$;
  }

  constructor(
    private store: TrafficMeisterStore,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.store.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(err => err && this.openSnackBar('Error', 'Retry'));
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  openSnackBar(message: string, action: string) {
    const snack = this._snackBar.open(message, action);
    snack
      .onAction()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(() => this.store.retry());
  }
}
