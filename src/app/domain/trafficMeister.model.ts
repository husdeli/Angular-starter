import { Vehicle } from './vehicle.model';

export interface TrafficMeister {
  types: Set<string>;
  brands: Set<string>;
  colors: Set<string>;
  vehicles: Vehicle[];
}
