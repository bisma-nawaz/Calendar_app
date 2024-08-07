import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CalendarModule } from './calendar/calendar.module';
const routes: Routes = [
  { path: '', redirectTo: 'calendar', pathMatch: 'full' },  
  { 
    // lazy loading:
    path: 'calendar', 
    loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule, CalendarModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
