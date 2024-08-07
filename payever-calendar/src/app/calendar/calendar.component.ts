import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../shared/models/appointment.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
  appointment: { title: string; date: Date } = { title: '', date: new Date() };
  appointments$: Observable<Appointment[]>;

  constructor(
    private appointmentService: AppointmentService
  ) {
    // Subscribe to appointments from the service
    this.appointments$ = this.appointmentService.getAppointments();
  }

  ngOnInit(): void {}

  // Handle form submission
  onSubmit(): void {
    const newAppointment: Appointment = {
      id: Date.now().toString(), // Assuming Appointment model has an id
      title: this.appointment.title,
      date: this.appointment.date  // Now correctly passing a Date object
    };
    this.appointmentService.addAppointment(newAppointment);
    this.appointment = { title: '', date: new Date() }; // Reset form with new Date object
  }

  // Delete an appointment by ID
  deleteAppointment(id: string): void {
    this.appointmentService.deleteAppointment(id);
  }

  // Handle drag and drop events
  drop(event: CdkDragDrop<Appointment[]>) {
    this.appointments$.subscribe(appointments => {
      moveItemInArray(appointments, event.previousIndex, event.currentIndex);
      appointments.forEach((appointment, index) => {
        const updatedAppointment: Appointment = { 
          ...appointment, 
          date: new Date(appointment.date.getTime() + index * 24 * 60 * 60 * 1000)
        };
        this.appointmentService.updateAppointment(updatedAppointment);
      });
    });
  }
}
