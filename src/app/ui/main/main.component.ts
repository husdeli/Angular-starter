import { Component } from '@angular/core';
import { FilterStore } from 'src/app/domain/filter.store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  displayedColumns = ['image', 'id', 'type', 'brand', 'color'];
  vehicles$ = this.store.filteredVehicles$;

  constructor(private store: FilterStore) {}
}
