import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsEmployeeGuard } from './guards/is-employee.guard';
import { IsNotAuthGuard } from './guards/is-not-auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path : '' , loadChildren : () => import('./auth/auth.module').then(m => m.AuthModule) , canActivate : [IsNotAuthGuard]},
  { path : 'employee' , loadChildren :()=> import('./employee/employee.module').then(m => m.EmployeeModule) , canActivate : [AuthGuard , IsEmployeeGuard]},
  {path:'admin' ,canActivate : [AuthGuard , IsAdminGuard] , loadChildren : () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
