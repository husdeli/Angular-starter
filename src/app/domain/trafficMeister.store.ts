import { Inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  shareReplay,
  switchMap,
} from 'rxjs';
import { TrafficRepositoryToken } from './repository.token';
import { TrafficMeisterRepository } from './trafficMeister.repository';

@Injectable({ providedIn: 'root' })
export class TrafficMeisterStore {
  private _loadDataSubject$ = new BehaviorSubject(undefined);
  private _error$ = new BehaviorSubject<Error | null>(null);
  private _isLoading$ = new BehaviorSubject(true);

  get isLoading$() {
    return this._isLoading$.asObservable();
  }

  data$ = this._loadDataSubject$.pipe(
    switchMap(() => this.getData()),
    shareReplay(1)
  );

  types$ = this.data$.pipe(map(data => Array.from(data.types)));
  colors$ = this.data$.pipe(map(data => Array.from(data.colors)));
  brands$ = this.data$.pipe(map(data => Array.from(data.brands)));
  vehicles$ = this.data$.pipe(map(data => data.vehicles));

  get error$() {
    return this._error$.asObservable();
  }

  constructor(
    @Inject(TrafficRepositoryToken) private service: TrafficMeisterRepository
  ) {}

  getData() {
    this.setLoading();
    return this.service
      .getData()
      .pipe(catchError(this.handleError), finalize(this.setLoadingFinished));
  }

  setLoading = () => {
    this._isLoading$.next(true);
  };

  setLoadingFinished = () => {
    this._isLoading$.next(false);
  };

  retry() {
    if (this._error$.getValue()) {
      this.resetError();
    }
    this._loadDataSubject$.next(undefined);
  }

  resetError() {
    this._error$.next(null);
  }

  private handleError = (err: Error) => {
    this._error$.next(err);
    return [];
  };
}
