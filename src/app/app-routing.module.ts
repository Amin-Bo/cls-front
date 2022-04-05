import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CertifComponent } from './employee/certif.component';
import { LeaveComponent } from './employee/leave/leave.component';
import { ProfileComponent } from './employee/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsEmployeeGuard } from './guards/is-employee.guard';
import { IsNotAuthGuard } from './guards/is-not-auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
  {  path: '',component: AuthComponent, canActivate: [IsNotAuthGuard] },
  {path: 'employee',redirectTo:'employee/work',pathMatch:'full'},
  {path: 'employee', component: SidenavComponent, canActivate : [AuthGuard , IsEmployeeGuard] , children:[
    {path : 'profile',component : ProfileComponent},
    {path : 'leave',component : LeaveComponent},
    {path: ':type', component: CertifComponent},
    
  ]},
  {path:'admin' ,canActivate : [AuthGuard , IsAdminGuard] , loadChildren : () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
