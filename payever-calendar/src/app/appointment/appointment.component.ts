import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Appointment } from '../shared/models/appointment.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppointmentComponent {
  @Input() appointment!: Appointment;
  @Output() delete = new EventEmitter<string>();

  constructor(private datePipe: DatePipe) {}

  onDelete(): void {
    if (this.appointment && this.appointment.id) {
      this.delete.emit(this.appointment.id);
    }
  }

  // Example of using the DatePipe
  getFormattedDate(date: Date, format: string): string {
    const formattedDate = this.datePipe.transform(date, format);
    return formattedDate !== null ? formattedDate : '';
  }
}