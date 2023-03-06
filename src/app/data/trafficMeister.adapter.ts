import { TrafficMeister, Vehicle } from '../domain';
import { FetchDataDto } from './trafficMeister.types';

export function adaptResponse(data: FetchDataDto): TrafficMeister {
  const types = new Set<string>([]);
  const colors = new Set<string>([]);
  const brands = new Set<string>([]);
  const vehicles: Vehicle[] = [];

  for (let i = 0; i < data.length; i++) {
    const { id, brand, colors: vehicleColors, img, type } = data[i];
    types.add(type);
    brands.add(brand);
    vehicleColors.forEach(color => colors.add(color));
    vehicles.push({ id, brand, colors: vehicleColors, img, type });
  }
  return {
    types,
    colors,
    vehicles,
    brands,
  };
}
