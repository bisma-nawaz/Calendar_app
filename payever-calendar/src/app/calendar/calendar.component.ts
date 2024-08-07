import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../shared/models/appointment.model';
import { FormsModule } from '@angular/forms';
import { NgFor, AsyncPipe, DatePipe, CommonModule } from "@angular/common";
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    AsyncPipe,
    DatePipe,
    DragDropModule,
    CommonModule
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  appointment: Partial<Appointment> = {};
  appointments$: Observable<Appointment[]>;
  isEditing = false;

  constructor(private appointmentService: AppointmentService) {
    this.appointments$ = this.appointmentService.getAppointments();
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.appointment.title && this.appointment.date) {
      if (this.isEditing && this.appointment.id) {
        this.appointmentService.updateAppointment(this.appointment as Appointment);
        this.isEditing = false;
      } else {
        const newAppointment: Appointment = {
          id: Date.now().toString(),
          title: this.appointment.title,
          date: new Date(this.appointment.date)
        };
        this.appointmentService.addAppointment(newAppointment);
      }
      this.appointment = {};
    }
  }

  deleteAppointment(id: string): void {
    this.appointmentService.deleteAppointment(id);
  }

  editAppointment(apt: Appointment): void {
    this.appointment = { ...apt, date: new Date(apt.date) };
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.appointment = {};
    this.isEditing = false;
  }

  drop(event: CdkDragDrop<Appointment[]>) {
    this.appointmentService.moveAppointment(event.previousIndex, event.currentIndex);
  }
}