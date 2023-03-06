import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { TrafficMeisterStore } from './trafficMeister.store';
import { Vehicle } from './vehicle.model';

interface Filter {
  type: string | null;
  brand: string | null;
  color: string | null;
}

@Injectable({ providedIn: 'root' })
export class FilterStore {
  private _filter$ = new BehaviorSubject<Filter>({
    brand: null,
    color: null,
    type: null,
  });

  get filter() {
    return this._filter$.getValue();
  }

  get filteredTypes$() {
    return this.filteredVehicles$.pipe(
      switchMap((filteredVehicles: Vehicle[]) => {
        return this.store.types$.pipe(
          map(types =>
            types.filter(type => this.typesFilterFn(type, filteredVehicles))
          )
        );
      })
    );
  }

  get filteredColors$() {
    return this.filteredVehicles$.pipe(
      switchMap((filteredVehicles: Vehicle[]) => {
        return this.store.colors$.pipe(
          map(colors =>
            colors.filter(color => this.colorsFilterFn(color, filteredVehicles))
          )
        );
      })
    );
  }

  get filteredBrands$() {
    return this.filteredVehicles$.pipe(
      switchMap((filteredVehicles: Vehicle[]) => {
        return this.store.brands$.pipe(
          map(brands =>
            brands.filter(brand => this.brandsFilterFn(brand, filteredVehicles))
          )
        );
      })
    );
  }

  get filteredVehicles$() {
    return this._filter$.pipe(
      switchMap(() => this.store.vehicles$),
      map(vehicles => vehicles.filter(this.vehicleFilterFn))
    );
  }

  constructor(private store: TrafficMeisterStore) {}

  setFilter(value: Filter) {
    this._filter$.next(value);
  }

  private vehicleFilterFn = (vehicle: Vehicle) => {
    const filter = this._filter$.getValue();
    if (filter.brand && vehicle.brand !== filter.brand) {
      return false;
    }
    if (filter.type && vehicle.type !== filter.type) {
      return false;
    }
    if (filter.color && !vehicle.colors.includes(filter.color)) {
      return false;
    }

    return true;
  };

  private typesFilterFn = (type: string, filteredVehicles: Vehicle[]) => {
    return filteredVehicles.some(vehicle => vehicle.type === type);
  };

  private colorsFilterFn = (color: string, filteredVehicles: Vehicle[]) => {
    return filteredVehicles.some(vehicle => vehicle.colors.includes(color));
  };

  private brandsFilterFn = (brand: string, filteredVehicles: Vehicle[]) => {
    return filteredVehicles.some(vehicle => vehicle.brand === brand);
  };
}
