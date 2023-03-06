import { TrafficMeisterService } from '../trafficMeister.service';

import trafficMeister from 'trafficMeister';
import {
  simpleResposeMock,
  simpleResposeTransformedMock,
} from './trafficMeister.mock.spec';

describe('TrafficMeisterService', () => {
  let sut: TrafficMeisterService;
  let fetchSpy: jasmine.Spy;

  beforeEach(() => {
    sut = new TrafficMeisterService();
    fetchSpy = spyOn(trafficMeister, 'fetchData');
  });

  it('should fetch the data', () => {
    fetchSpy.and.callFake(cb => cb(null, simpleResposeMock));
    sut.getData();
    expect(fetchSpy).toHaveBeenCalled();
  });

  it('should transform the data', done => {
    fetchSpy.and.callFake(cb => cb(null, simpleResposeMock));

    const data$ = sut.getData();
    data$.subscribe(data => {
      expect(data).toEqual(simpleResposeTransformedMock);
      done();
    });
  });

  it('should get an error', done => {
    fetchSpy.and.callFake(cb => cb('testError'));

    const data$ = sut.getData();
    data$.subscribe({
      next: () => {
        // Mustn't get here
        expect(true).toEqual(false);
      },
      error: err => {
        expect(err).toEqual('testError');
        done();
      },
    });
  });
});
