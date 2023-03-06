import { TestBed } from '@angular/core/testing';
import { FilterStore } from '../filter.store';
import { TrafficMeisterStore } from '../trafficMeister.store';
import { severalVehiclesResponseTransformedMock } from 'src/app/data/__testing__/trafficMeister.mock.spec';
import { of } from 'rxjs';

describe('FilterStore', () => {
  let sut: FilterStore;
  let fakeTrafficMeisterStore: TrafficMeisterStore;

  beforeEach(() => {
    // Prepare fake store
    fakeTrafficMeisterStore = {} as TrafficMeisterStore;
    fakeTrafficMeisterStore.vehicles$ = of(
      severalVehiclesResponseTransformedMock.vehicles
    );
    fakeTrafficMeisterStore.types$ = of(
      Array.from(severalVehiclesResponseTransformedMock.types)
    );
    fakeTrafficMeisterStore.colors$ = of(
      Array.from(severalVehiclesResponseTransformedMock.colors)
    );
    fakeTrafficMeisterStore.brands$ = of(
      Array.from(severalVehiclesResponseTransformedMock.brands)
    );

    TestBed.configureTestingModule({
      providers: [
        FilterStore,
        { provide: TrafficMeisterStore, useValue: fakeTrafficMeisterStore },
      ],
    });
    sut = TestBed.inject(FilterStore);
  });

  it('should has default filter value', () => {
    expect(sut.filter).toEqual({
      brand: null,
      type: null,
      color: null,
    });
  });

  it('should not filter out vehicles by default', done => {
    sut.filteredVehicles$.subscribe(vehicles => {
      expect(vehicles).toEqual(severalVehiclesResponseTransformedMock.vehicles);
      done();
    });
  });

  it('should filter out vehicles by type', done => {
    sut.setFilter({ ...sut.filter, type: 'car' });
    sut.filteredVehicles$.subscribe(vehicles => {
      expect(vehicles).toEqual([
        {
          id: 1,
          type: 'car',
          brand: 'Bugatti Veyron',
          colors: ['red', 'black'],
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg/520px-Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg',
        },
        {
          id: 10,
          type: 'car',
          brand: 'Ferrari F40',
          colors: ['red', 'yellow'],
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/F40_Ferrari_20090509.jpg/1920px-F40_Ferrari_20090509.jpg',
        },
      ]);
      done();
    });
  });

  it('should filter out vehicles by brand', done => {
    sut.setFilter({ ...sut.filter, brand: 'Bugatti Veyron' });
    sut.filteredVehicles$.subscribe(vehicles => {
      expect(vehicles).toEqual([
        {
          id: 1,
          type: 'car',
          brand: 'Bugatti Veyron',
          colors: ['red', 'black'],
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg/520px-Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg',
        },
      ]);
      done();
    });
  });

  it('should filter out vehicles by color', done => {
    sut.setFilter({ ...sut.filter, color: 'white' });
    sut.filteredVehicles$.subscribe(vehicles => {
      expect(vehicles).toEqual([
        {
          id: 2,
          type: 'airplane',
          brand: 'Boeing 787 Dreamliner',
          colors: ['red', 'white', 'black', 'green'],
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/All_Nippon_Airways_Boeing_787-8_Dreamliner_JA801A_OKJ_in_flight.jpg/600px-All_Nippon_Airways_Boeing_787-8_Dreamliner_JA801A_OKJ_in_flight.jpg',
        },
      ]);
      done();
    });
  });

  it('should get types of filtered vehicles', done => {
    sut.setFilter({ ...sut.filter, color: 'white' });
    sut.filteredTypes$.subscribe(types => {
      expect(types).toEqual(['airplane']);
      done();
    });
  });

  it('should get colors of filtered vehicles', done => {
    sut.setFilter({ ...sut.filter, type: 'car' });
    sut.filteredColors$.subscribe(colors => {
      expect(colors).toEqual(['red', 'black', 'yellow']);
      done();
    });
  });

  it('should get brands of filtered vehicles', done => {
    sut.setFilter({ ...sut.filter, type: 'car' });
    sut.filteredBrands$.subscribe(brands => {
      expect(brands).toEqual(['Bugatti Veyron', 'Ferrari F40']);
      done();
    });
  });
});
