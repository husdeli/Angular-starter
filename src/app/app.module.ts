import { NgModule } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './ui/header/header.component';
import { MainComponent } from './ui/main/main.component';
import { TrafficRepositoryToken } from './domain/repository.token';
import { TrafficMeisterService } from './data/trafficMeister.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    NgOptimizedImage,
    MatProgressBarModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    { provide: TrafficRepositoryToken, useExisting: TrafficMeisterService },
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent, HeaderComponent, MainComponent],
})
export class AppModule {}
