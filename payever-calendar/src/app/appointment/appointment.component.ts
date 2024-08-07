import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-appointment',
  template: `
    <div>
      <h3>Add Appointment</h3>
      <button (click)="onDelete()">Delete</button>
    </div>
  `,
  styles: [`
    div {
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 10px;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class AppointmentComponent {
  @Output() delete = new EventEmitter<string>();

  onDelete(): void {
    this.delete.emit('dummy-id');
  }
}