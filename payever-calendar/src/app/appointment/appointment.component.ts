// appointment.component.ts
import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Appointment } from '../shared/models/appointment.model';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class AppointmentComponent {
  @Input() appointment!: Appointment;
  @Output() delete = new EventEmitter<string>();

  onDelete(): void {
    this.delete.emit(this.appointment.id);
  }
}
