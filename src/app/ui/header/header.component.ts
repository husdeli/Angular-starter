import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FilterStore } from 'src/app/domain';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title = 'Angular Vehicles';
  formActive = false;

  $types = this.store.filteredTypes$;
  $colors = this.store.filteredColors$;
  $brands = this.store.filteredBrands$;

  constructor(private store: FilterStore) {}

  toggleForm() {
    this.formActive = !this.formActive;
  }

  onTypeChange({ value }: MatSelectChange) {
    const newValue = { ...this.store.filter, type: value };
    this.store.setFilter(newValue);
  }

  onBrandChange({ value }: MatSelectChange) {
    const newValue = { ...this.store.filter, brand: value };
    this.store.setFilter(newValue);
  }

  onColorChange({ value }: MatSelectChange) {
    const newValue = { ...this.store.filter, color: value };
    this.store.setFilter(newValue);
  }
}
