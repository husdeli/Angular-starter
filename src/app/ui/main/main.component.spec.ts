import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { NgOptimizedImage } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import {
  MatRowHarness,
  MatTableHarness,
} from '@angular/material/table/testing';

import { of } from 'rxjs';
import { severalVehiclesResponseTransformedMock } from 'src/app/data/__testing__/trafficMeister.mock.spec';
import { FilterStore } from 'src/app/domain';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    const fakeStore = {
      filteredVehicles$: of(severalVehiclesResponseTransformedMock.vehicles),
    } as unknown as FilterStore;
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [MatTableModule, NgOptimizedImage],
      providers: [{ provide: FilterStore, useValue: fakeStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table', async () => {
    const table = await loader.getHarness(MatTableHarness);
    expect(table).toBeTruthy();
  });

  it('should render row for each vehicle', async () => {
    const rows = await loader.getAllHarnesses(MatRowHarness);
    expect(rows.length).toEqual(
      severalVehiclesResponseTransformedMock.vehicles.length
    );
  });

  it('should render the "image" cell first for each row', async () => {
    const rows = await loader.getAllHarnesses(MatRowHarness);
    rows.forEach(async row => {
      const cells = await row.getCells();
      expect(await cells[0].getColumnName()).toEqual('image');
    });
  });

  it('should render the "id" cell second for each row', async () => {
    const rows = await loader.getAllHarnesses(MatRowHarness);
    rows.forEach(async row => {
      const cells = await row.getCells();
      expect(await cells[1].getColumnName()).toEqual('id');
    });
  });

  it('should render the "type" cell third for each row', async () => {
    const rows = await loader.getAllHarnesses(MatRowHarness);
    rows.forEach(async row => {
      const cells = await row.getCells();
      expect(await cells[2].getColumnName()).toEqual('type');
    });
  });

  it('should render the "brand" cell third for each row', async () => {
    const rows = await loader.getAllHarnesses(MatRowHarness);
    rows.forEach(async row => {
      const cells = await row.getCells();
      expect(await cells[3].getColumnName()).toEqual('brand');
    });
  });

  it('should render the "color" cell third for each row', async () => {
    const rows = await loader.getAllHarnesses(MatRowHarness);
    rows.forEach(async row => {
      const cells = await row.getCells();
      expect(await cells[4].getColumnName()).toEqual('color');
    });
  });
});
