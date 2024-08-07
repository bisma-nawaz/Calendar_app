import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appointment } from '../shared/models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointments = new BehaviorSubject<Appointment[]>([]);

  getAppointments(): Observable<Appointment[]> {
    return this.appointments.asObservable();
  }

  addAppointment(appointment: Appointment): void {
    const currentAppointments = this.appointments.getValue();
    appointment.id = Date.now().toString();  // Ensure each appointment has a unique ID
    this.appointments.next([...currentAppointments, appointment]);
  }
  

  updateAppointment(updatedAppointment: Appointment): void {
    const currentAppointments = this.appointments.getValue();
    const index = currentAppointments.findIndex(apt => apt.id === updatedAppointment.id);
    if (index !== -1) {
      currentAppointments[index] = updatedAppointment;
      this.appointments.next([...currentAppointments]);
    }
  }

  deleteAppointment(id: string): void {
    const currentAppointments = this.appointments.getValue();
    this.appointments.next(currentAppointments.filter(apt => apt.id !== id));
  }

  getAppointmentsForDate(date: Date): Observable<Appointment[]> {
    return this.appointments.pipe(
      map(appointments => appointments.filter(apt => 
        apt.date.getDate() === date.getDate() &&
        apt.date.getMonth() === date.getMonth() &&
        apt.date.getFullYear() === date.getFullYear()
      ))
    );
  }

  moveAppointment(appointment: Appointment, previousDate: Date, newDate: Date): void {
    const appointments = this.appointments.getValue();
    const index = appointments.findIndex(apt => apt.id === appointment.id && apt.date.toISOString() === previousDate.toISOString());
    if (index !== -1) {
      appointments[index].date = newDate; // Directly update the date
      this.appointments.next([...appointments]);
    }
  }
  
  
}