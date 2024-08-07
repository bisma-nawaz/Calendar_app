import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from '../shared/models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointmentsSubject = new BehaviorSubject<Appointment[]>([]);

  getAppointments(): Observable<Appointment[]> {
    return this.appointmentsSubject.asObservable();
  }

  addAppointment(appointment: Appointment): void {
    const currentAppointments = this.appointmentsSubject.value;
    this.appointmentsSubject.next([...currentAppointments, appointment]);
  }

  deleteAppointment(id: string): void {
    const currentAppointments = this.appointmentsSubject.value;
    this.appointmentsSubject.next(currentAppointments.filter(app => app.id !== id));
  }

  updateAppointment(updatedAppointment: Appointment): void {
    const currentAppointments = this.appointmentsSubject.value;
    const index = currentAppointments.findIndex(app => app.id === updatedAppointment.id);
    if (index !== -1) {
      currentAppointments[index] = updatedAppointment;
      this.appointmentsSubject.next([...currentAppointments]);
    }
  }
}