import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable , of} from 'rxjs';
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
    appointment.id = Date.now().toString();  
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
  


  getAppointmentsForDate(date: Date): Observable<Appointment[]> {
    return this.appointments.pipe(
      map(appointments => appointments.filter(apt => 
        apt.date.getDate() === date.getDate() &&
        apt.date.getMonth() === date.getMonth() &&
        apt.date.getFullYear() === date.getFullYear()
      ))
    );
  }

  deleteAppointment(id: string): Observable<void> {
    const currentAppointments = this.appointments.getValue();
    this.appointments.next(currentAppointments.filter(apt => apt.id !== id));
    return of(void 0);
  }
  moveAppointment(appointment: Appointment, previousDate: Date, newDate: Date): void {
    const appointments = this.appointments.getValue();
    const index = appointments.findIndex(apt => apt.id === appointment.id);
    if (index !== -1) {
      const updatedAppointment = { ...appointments[index], date: newDate };
      appointments[index] = updatedAppointment;
      this.appointments.next([...appointments]);
    }
  }
  
}