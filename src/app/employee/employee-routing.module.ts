import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { IsEmployeeGuard } from '../guards/is-employee.guard';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CertifComponent } from './certif.component';
import { LeaveComponent } from './leave/leave.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path : '' , redirectTo : 'employee/work', pathMatch : 'full'},
  {path: '', component: SidenavComponent, canActivate : [AuthGuard , IsEmployeeGuard] , children:[
    {path : 'profile',component : ProfileComponent},
    {path : 'leave',component : LeaveComponent},
    {path: ':type', component: CertifComponent},
    
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
