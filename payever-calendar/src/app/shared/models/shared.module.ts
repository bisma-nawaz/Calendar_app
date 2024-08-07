// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentComponent } from '../../appointment/appointment.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  declarations: [AppointmentComponent],
  imports: [CommonModule],
  exports: [AppointmentComponent, 
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
