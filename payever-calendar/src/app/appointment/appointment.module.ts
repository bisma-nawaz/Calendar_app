import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppointmentComponent } from './appointment.component';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
      // Declare the AppointmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,          // Import FormsModule if you're using template-driven forms
    ReactiveFormsModule,  // Import ReactiveFormsModule if you're using reactive forms
    MatButtonModule,
    MatCardModule,
  ],
  exports: [
    AppointmentComponent  // Export AppointmentComponent if it will be used in other modules
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Add this line
})
export class AppointmentModule { }
