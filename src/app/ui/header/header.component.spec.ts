import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { FilterStore } from 'src/app/domain';
import { MatSelectHarness } from '@angular/material/select/testing';
import { HeaderComponent } from './header.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let loader: HarnessLoader;
  let setFilterSpy: jasmine.Spy;

  beforeEach(async () => {
    const fakeFilterStore = {
      filter: {
        brand: null,
        color: null,
        type: null,
      },
      filteredTypes$: of(['test-type']),
      filteredColors$: of(['test-color']),
      filteredBrands$: of(['test-brand']),
      setFilter: jasmine.createSpy('setFilter'),
    } as unknown as FilterStore;
    setFilterSpy = fakeFilterStore.setFilter as jasmine.Spy;

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        MatToolbarModule,
        MatSelectModule,
        NoopAnimationsModule,
        MatIconModule,
        MatButtonModule,
      ],
      providers: [
        {
          provide: FilterStore,
          useValue: fakeFilterStore,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain(component.title);
  });

  describe('types dropdown', () => {
    it('should render types dropdown', () => {
      const select = fixture.debugElement.query(By.css('#types-select'));
      expect(select).toBeTruthy();
    });

    it('should render "All" option of types dropdown', async () => {
      const result = await loader.getAllHarnesses(MatSelectHarness);
      const typesSelect = result[0];

      await typesSelect.open();

      const options = await typesSelect.getOptions();
      expect(await options[0].getText()).toEqual('All');
    });

    it('should render proper options of types dropdown', async () => {
      const result = await loader.getAllHarnesses(MatSelectHarness);
      const typesSelect = result[0];

      await typesSelect.open();

      const options = await typesSelect.getOptions();
      expect(options.length).toEqual(2);
      expect(await options[1].getText()).toEqual('test-type');
    });

    it('should set type filter', async () => {
      const result = await loader.getAllHarnesses(MatSelectHarness);
      const typesSelect = result[0];

      await typesSelect.open();

      const options = await typesSelect.getOptions();
      await options[1].click();

      expect(setFilterSpy).toHaveBeenCalledWith({
        brand: null,
        color: null,
        type: 'test-type',
      });
    });
  });

  describe('brands dropdown', () => {
    it('should render brands dropdown', () => {
      const select = fixture.debugElement.query(By.css('#brands-select'));
      expect(select).toBeTruthy();
    });

    it('should render "All" option of brands dropdown', async () => {
      const result = await loader.getAllHarnesses(MatSelectHarness);
      const brandsSelect = result[1];

      await brandsSelect.open();

      const options = await brandsSelect.getOptions();
      expect(await options[0].getText()).toEqual('All');
    });

    it('should render proper options of brands dropdown', async () => {
      const result = await loader.getAllHarnesses(MatSelectHarness);
      const brandsSelect = result[1];

      await brandsSelect.open();

      const options = await brandsSelect.getOptions();
      expect(options.length).toEqual(2);
      expect(await options[1].getText()).toEqual('test-brand');
    });

    it('should set brands filter', async () => {
      const result = await loader.getAllHarnesses(MatSelectHarness);
      const brandsSelect = result[1];

      await brandsSelect.open();

      const options = await brandsSelect.getOptions();
      await options[1].click();

      expect(setFilterSpy).toHaveBeenCalledWith({
        brand: 'test-brand',
        color: null,
        type: null,
      });
    });
  });

  describe('colors dropdown', () => {
    it('should render colors dropdown', () => {
      const select = fixture.debugElement.query(By.css('#colors-select'));
      expect(select).toBeTruthy();
    });

    it('should render "All" option of colors dropdown', async () => {
      const result = await loader.getAllHarnesses(MatSelectHarness);
      const colorsSelect = result[2];

      await colorsSelect.open();

      const options = await colorsSelect.getOptions();
      expect(await options[0].getText()).toEqual('All');
    });

    it('should render proper options of colors dropdown', async () => {
      const result = await loader.getAllHarnesses(MatSelectHarness);
      const colorsSelect = result[2];

      await colorsSelect.open();

      const options = await colorsSelect.getOptions();
      expect(options.length).toEqual(2);
      expect(await options[1].getText()).toEqual('test-color');
    });

    it('should set colors filter', async () => {
      const result = await loader.getAllHarnesses(MatSelectHarness);
      const colorsSelect = result[2];

      await colorsSelect.open();

      const options = await colorsSelect.getOptions();
      await options[1].click();

      expect(setFilterSpy).toHaveBeenCalledWith({
        brand: null,
        color: 'test-color',
        type: null,
      });
    });
  });
});
