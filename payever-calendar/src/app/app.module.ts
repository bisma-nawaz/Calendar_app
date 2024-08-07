import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { AppointmentModule } from './appointment/appointment.module';
import { CalendarModule } from './calendar/calendar.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    DragDropModule,
    AppointmentModule,
    CalendarModule,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    CalendarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }