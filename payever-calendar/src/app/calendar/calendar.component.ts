import { Component, OnInit  ,ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../shared/models/appointment.model';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentComponent } from '../appointment/appointment.component';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import  { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
    DragDropModule,
    AppointmentComponent,
  ]
})
export class CalendarComponent implements OnInit {
  currentDate: Date;
  weeks: number[][] = [];
  currentMonth: number;
  currentYear: number;
  allDropLists: string[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef // add this to inject the ChangeDetectorRef

  ) {
    // Initialize the properties in the constructor
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
  }

  ngOnInit(): void {
    this.generateCalendarDays(this.currentDate);
    this.allDropLists = this.weeks.flat().map((_, index) => `dayDropList-${index}`);
  }

  generateCalendarDays(date: Date): void {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const firstDayOfWeek = firstDay.getDay();
    const totalDays = firstDayOfWeek + lastDay.getDate() + (6 - lastDay.getDay());
    const numWeeks = Math.ceil(totalDays / 7);

    this.weeks = [];

    let currentDate = 1;
    let nextMonthDate = 1;

    for (let i = 0; i < numWeeks; i++) {
      const week: number[] = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfWeek) {
          week.push(new Date(year, month - 1, new Date(year, month, 0).getDate() - firstDayOfWeek + j + 1).getDate());
        } else if (currentDate > lastDay.getDate()) {
          week.push(nextMonthDate++);
        } else {
          week.push(currentDate++);
        }
      }
      this.weeks.push(week);
    }
  }

  isCurrentMonth(day: number): boolean {
    return day > 0 && day <= new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  }

  getDateFromDay(day: number): Date {
    if (day < 1) {
      return new Date(this.currentYear, this.currentMonth - 1, day);
    } else if (day > new Date(this.currentYear, this.currentMonth + 1, 0).getDate()) {
      return new Date(this.currentYear, this.currentMonth + 1, day);
    } else {
      return new Date(this.currentYear, this.currentMonth, day);
    }
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentYear, this.currentMonth - 1, 1);
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.generateCalendarDays(this.currentDate);
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentYear, this.currentMonth + 1, 1);
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.generateCalendarDays(this.currentDate);
  }

  openAppointmentDialog(date: Date): void {
    const dialogRef = this.dialog.open(AppointmentComponent, { width: '250px', data: { date } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appointmentService.addAppointment(result);
        this.cdr.markForCheck();  // Manually trigger change detection
      }
    });
  }

  getAppointmentsForDate(date: Date): Observable<Appointment[]> {
    return this.appointmentService.getAppointmentsForDate(date);
  }

  onDrop(event: CdkDragDrop<Appointment[]>): void {
    if (event.previousContainer === event.container) {
      return; // No move happened
    }
    // Handle the drop event to update appointments
    const prevIndex = event.previousIndex;
    const currIndex = event.currentIndex;
    const data = event.container.data;
    moveItemInArray(data, prevIndex, currIndex);
    this.cdr.markForCheck();  // Trigger change detection
  }

}