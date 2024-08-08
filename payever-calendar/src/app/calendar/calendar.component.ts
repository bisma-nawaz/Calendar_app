import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../shared/models/appointment.model';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentComponent } from '../appointment/appointment.component';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  copyArrayItem,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
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
  ],
})
export class CalendarComponent implements OnInit {
  currentDate: Date;
  weeks: (number | null)[][];
  currentMonth: number;
  currentYear: number;
  allDropLists: string[] = [];
  appointmentsByDate: { [key: string]: BehaviorSubject<Appointment[]> } = {};

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.weeks = [];
  }

  ngOnInit(): void {
    this.generateCalendarDays(this.currentDate);
    this.allDropLists = this.weeks
      .flat()
      .map((_, index) => `dayDropList-${index}`);
    this.initializeAppointmentsByDate();
  }

  generateCalendarDays(date: Date): void {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    this.weeks = [];

    let currentDayIndex = 1 - firstDayOfWeek;
    const daysInWeek = 7;
    const numWeeks = Math.ceil((daysInMonth + firstDayOfWeek) / daysInWeek);

    for (let week = 0; week < numWeeks; week++) {
      let weekDays = [];
      for (let day = 0; day < daysInWeek; day++, currentDayIndex++) {
        if (currentDayIndex < 1 || currentDayIndex > daysInMonth) {
          weekDays.push(null);
        } else {
          weekDays.push(currentDayIndex);
        }
      }
      this.weeks.push(weekDays);
    }
  }

  isCurrentMonth(day: number | null): boolean {
    if (day === null) {
      return false;
    }
    return (
      day > 0 &&
      day <= new Date(this.currentYear, this.currentMonth + 1, 0).getDate()
    );
  }

  nextMonth(): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      this.currentDate.getDate()
    );
    this.refreshCurrentDate();
  }

  previousMonth(): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      this.currentDate.getDate()
    );
    this.refreshCurrentDate();
  }

  refreshCurrentDate(): void {
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.generateCalendarDays(this.currentDate);
    this.initializeAppointmentsByDate();
    this.cdr.markForCheck();
    console.log(
      `Month and year updated to: ${this.currentMonth + 1} - ${
        this.currentYear
      }`
    );
  }

  openAppointmentDialog(
    date: Date,
    appointment?: Appointment,
    event?: MouseEvent
  ): void {
    if (event) {
      event.stopPropagation();
    }

    const dialogRef = this.dialog.open(AppointmentComponent, {
      width: '250px',
      data: { date, appointment },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.appointmentService.updateAppointment(result);
        } else {
          this.appointmentService.addAppointment(result);
        }
        this.initializeAppointmentsByDate();
        this.cdr.markForCheck();
      } else {
        this.initializeAppointmentsByDate();
        this.cdr.markForCheck();
      }
    });
  }

  initializeAppointmentsByDate(): void {
    this.appointmentsByDate = {};
    this.weeks.flat().forEach((day, index) => {
      if (day !== null) {
        const date = this.getDateFromDay(day);
        const dateKey = this.getDateKey(date);
        this.appointmentsByDate[dateKey] = new BehaviorSubject<Appointment[]>(
          []
        );
        this.appointmentService
          .getAppointmentsForDate(date)
          .subscribe((appointments) => {
            this.appointmentsByDate[dateKey].next(appointments);
          });
      }
    });
  }

  getAppointmentsForDate(date: Date): Observable<Appointment[]> {
    const dateKey = this.getDateKey(date);
    if (!this.appointmentsByDate[dateKey]) {
      this.appointmentsByDate[dateKey] = new BehaviorSubject<Appointment[]>([]);
      this.appointmentService
        .getAppointmentsForDate(date)
        .subscribe((appointments) => {
          this.appointmentsByDate[dateKey].next(appointments);
        });
    }
    return this.appointmentsByDate[dateKey].asObservable();
  }

  getDateKey(date: Date | null): string {
    if (date === null) {
      return '';
    }
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  getDateFromDay(day: number | null): Date {
    if (day === null) {
      return new Date();
    }
    return new Date(this.currentYear, this.currentMonth, day);
  }

  onDrop(event: any): void {
    console.log(
      `Dragging from index: ${event.previousIndex} to index: ${event.currentIndex}`
    );
    console.log(
      `Container IDs: from - ${event.previousContainer.id}, to - ${event.container.id}`
    );

    if (!event.previousContainer.data || !event.container.data) {
      console.log('Data is missing from one of the containers.');
      return;
    }

    const fromIndex = parseInt(
      event.previousContainer.id.replace('dayDropList-', '')
    );
    const toIndex = parseInt(event.container.id.replace('dayDropList-', ''));
    console.log(`Resolved indices: from - ${fromIndex}, to - ${toIndex}`);

    let movedAppointment: Appointment;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      movedAppointment = event.container.data[event.currentIndex];
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      movedAppointment = event.container.data[event.currentIndex];
    }

    const targetDate = this.getDateFromDay(toIndex);
    console.log(`Moved to date: ${targetDate.toISOString()}`);
    this.appointmentService.moveAppointment(
      movedAppointment,
      this.getDateFromDay(fromIndex),
      targetDate
    );

    this.initializeAppointmentsByDate();
    this.cdr.markForCheck();
  }
}
