import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayCalendarComponent } from './day-calendar.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CalendarModule } from '../calendar/calendar.module';

@NgModule({
  declarations: [DayCalendarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    DragDropModule,
    BrowserModule,
    DatePipe,
    CalendarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [DayCalendarComponent]  // Make sure it's exported if you need to use it elsewhere
})
export class DayCalendarModule { }
