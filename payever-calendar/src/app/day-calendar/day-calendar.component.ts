import { Component } from '@angular/core';

@Component({
  selector: 'app-day-calendar',
  templateUrl: './day-calendar.component.html',
  styleUrls: ['./day-calendar.component.scss']
})
export class DayCalendarComponent {
  hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  appointments = [
    { title: 'Meeting', start: new Date(2024, 7, 8, 9, 30), end: new Date(2024, 7, 8, 10, 30) },
    { title: 'Lunch', start: new Date(2024, 7, 8, 12, 0), end: new Date(2024, 7, 8, 13, 0) },
    // Add more appointments as needed
  ];

  getAppointmentsForHour(hour: string): any[] {
    return this.appointments.filter(apt => {
      const startHour = apt.start.getHours();
      const endHour = apt.end.getHours();
      const hourNumber = parseInt(hour.split(':')[0]);
      return startHour <= hourNumber && hourNumber < endHour;
    });
  }

  getTopPosition(apt: any): string {
    const startMinutes = apt.start.getMinutes();
    return `${startMinutes}px`;
  }

  getHeight(apt: any): string {
    const duration = (apt.end.getTime() - apt.start.getTime()) / 60000;
    return `${duration}px`;
  }
}
