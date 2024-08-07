// calendar-routing.module.ts (Create this file if it doesn't exist)
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar.component';

const routes: Routes = [
  { path: '', component: CalendarComponent }  // Empty path since '/calendar' is already handled
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
