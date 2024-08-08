import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { Appointment } from '../shared/models/appointment.model';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppointmentService } from './appointment.service';
@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    DragDropModule
  ],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {
  appointmentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { date: Date; appointment?: Appointment },
    private fb: FormBuilder,
    private appointmentService: AppointmentService 

  ) {
    this.appointmentForm = this.fb.group({
      id: [data.appointment?.id || ''],
      title: [data.appointment?.title || '', Validators.required],
      date: [data.appointment?.date || data.date, Validators.required],
      description: [data.appointment?.description || '']
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      this.dialogRef.close(this.appointmentForm.value);
    }
  }
  onDelete(): void {
    if (this.data.appointment?.id) {
      this.appointmentService.deleteAppointment(this.data.appointment.id).subscribe(() => {
        this.dialogRef.close(); 
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}