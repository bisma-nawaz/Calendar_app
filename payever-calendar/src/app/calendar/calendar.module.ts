import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { DragDrop, DragDropModule, DragDropRegistry } from '@angular/cdk/drag-drop';
import { CalendarComponent } from './calendar.component';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentComponent } from '../appointment/appointment.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CdkDragMove } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    AppointmentComponent,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    DragDropModule,
    BrowserModule,
    MatIconModule,
    DragDrop,
    DragDropRegistry,
    MatDialogModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe],
  exports: [CalendarComponent]
})
export class CalendarModule { }