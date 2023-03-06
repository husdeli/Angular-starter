import { Observable } from 'rxjs';
import { TrafficMeister } from './trafficMeister.model';

export interface TrafficMeisterRepository {
  getData(): Observable<TrafficMeister>;
}
