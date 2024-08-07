import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from './shared/models/shared.module'; // If SharedModule is used here
import { AppointmentModule } from './appointment/appointment.module'; // If AppointmentModule is used here
import { CalendarModule } from './calendar/calendar.module'; // If CalendarModule is used here
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    CalendarModule,
    AppointmentModule
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MatToolbarModule,
    MatDialogModule,
    SharedModule,
    AppointmentModule,
    CalendarModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    AppointmentModule,
    CalendarModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
  bootstrap: [AppComponent],
})
export class AppModule { }
