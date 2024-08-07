import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../shared/models/appointment.model';
import { FormsModule } from '@angular/forms';
import { NgFor, AsyncPipe, DatePipe, CommonModule } from "@angular/common";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [ 
    NgFor,
    FormsModule,
    AsyncPipe,
    DatePipe,
    FormsModule
    ], 
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  appointment: Partial<Appointment> = {};
  appointments$: Observable<Appointment[]>;

  constructor(private appointmentService: AppointmentService) {
    this.appointments$ = this.appointmentService.getAppointments();
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.appointment.title && this.appointment.date) {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        title: this.appointment.title,
        date: new Date(this.appointment.date)
      };
      this.appointmentService.addAppointment(newAppointment);
      this.appointment = {}; 
    }
  }

  deleteAppointment(id: string): void {
    this.appointmentService.deleteAppointment(id);
  }
}