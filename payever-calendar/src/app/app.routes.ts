// app.routes.ts
import { Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';

export const routes: Routes = [
  { path: '', redirectTo: 'calendar', pathMatch: 'full' },  // Ensure pathMatch is correctly set
  { path: 'calendar', component: CalendarComponent }
];
