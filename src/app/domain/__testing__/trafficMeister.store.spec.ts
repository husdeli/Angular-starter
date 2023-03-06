import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { simpleResposeTransformedMock } from 'src/app/data/__testing__/trafficMeister.mock.spec';
import { TrafficRepositoryToken } from '../repository.token';
import { TrafficMeisterRepository } from '../trafficMeister.repository';
import { TrafficMeisterStore } from '../trafficMeister.store';

describe('TrafficMeisterStore', () => {
  let sut: TrafficMeisterStore;
  let serviceSpy: jasmine.SpyObj<TrafficMeisterRepository>;

  beforeEach(() => {
    const fakeService = jasmine.createSpyObj('TrafficRepository', ['getData']);
    TestBed.configureTestingModule({
      providers: [
        TrafficMeisterStore,
        { provide: TrafficRepositoryToken, useValue: fakeService },
      ],
    });
    sut = TestBed.inject(TrafficMeisterStore);
    serviceSpy = fakeService;
  });

  it('should get the data', done => {
    serviceSpy.getData.and.returnValue(of(simpleResposeTransformedMock));
    sut.data$.subscribe(data => {
      expect(data).toEqual(simpleResposeTransformedMock);
      done();
    });
  });

  it('should get the vehicles', done => {
    serviceSpy.getData.and.returnValue(of(simpleResposeTransformedMock));
    sut.vehicles$.subscribe(data => {
      expect(data).toEqual(simpleResposeTransformedMock.vehicles);
      done();
    });
  });

  it('should get the brands', done => {
    serviceSpy.getData.and.returnValue(of(simpleResposeTransformedMock));
    sut.brands$.subscribe(data => {
      expect(data).toEqual(Array.from(simpleResposeTransformedMock.brands));
      done();
    });
  });

  it('should get the colors', done => {
    serviceSpy.getData.and.returnValue(of(simpleResposeTransformedMock));
    sut.colors$.subscribe(data => {
      expect(data).toEqual(Array.from(simpleResposeTransformedMock.colors));
      done();
    });
  });

  it('should get the types of vehicles', done => {
    serviceSpy.getData.and.returnValue(of(simpleResposeTransformedMock));
    sut.types$.subscribe(data => {
      expect(data).toEqual(Array.from(simpleResposeTransformedMock.types));
      done();
    });
  });

  it('should change loading state', done => {
    serviceSpy.getData.and.returnValue(of(simpleResposeTransformedMock));

    let iteration = 0;
    sut.isLoading$.subscribe(isLoading => {
      // Initial value
      if (iteration === 0) {
        expect(isLoading).toEqual(true);
      }
      // Start loading
      if (iteration === 1) {
        expect(isLoading).toEqual(true);
      }
      // Finish loading
      if (iteration === 2) {
        expect(isLoading).toEqual(false);
        done();
      }
      iteration++;
    });

    sut.data$.subscribe();
  });

  it('should catch the error', done => {
    const err = new Error('testError');
    serviceSpy.getData.and.returnValue(throwError(() => err));

    let iteration = 0;
    sut.error$.subscribe(error => {
      if (iteration === 0) {
        expect(error).toBeNull();
      }
      if (iteration === 1) {
        expect(error).toEqual(err);
        done();
      }
      iteration++;
    });

    sut.data$.subscribe();
  });

  it('should retry getting the data', done => {
    const err = new Error('testError');
    let retry = false;
    // Simulate throwing an error on the first call
    // And correct value after retry
    serviceSpy.getData.and.callFake(() => {
      if (retry) {
        return of(simpleResposeTransformedMock);
      }
      return throwError(() => err);
    });

    sut.error$.subscribe(error => {
      if (error) {
        retry = true;
        sut.retry();
      }
    });

    sut.data$.subscribe(data => {
      expect(retry).toBeTruthy();
      expect(data).toEqual(simpleResposeTransformedMock);
      done();
    });
  });
});
