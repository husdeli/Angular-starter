import { Injectable } from '@angular/core';
import { from, Observable, map } from 'rxjs';
import trafficMeister from 'trafficMeister';
import { TrafficMeisterRepository, TrafficMeister } from '../domain';
import { adaptResponse } from './trafficMeister.adapter';
import { FetchDataDto } from './trafficMeister.types';

const fetchDataPromise = () =>
  new Promise<FetchDataDto>((res, rej) => {
    trafficMeister.fetchData((err: string, data: unknown) => {
      if (err) {
        rej(err);
      } else {
        res(data as FetchDataDto);
      }
    });
  });

@Injectable({ providedIn: 'root' })
export class TrafficMeisterService implements TrafficMeisterRepository {
  getData(): Observable<TrafficMeister> {
    return from(fetchDataPromise()).pipe(map(adaptResponse));
  }
}
