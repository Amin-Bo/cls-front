import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { RequestsService } from 'src/app/services/requests.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})
export class NavAdminComponent implements OnInit,OnDestroy {
  firstName : String;
  lastName : String;
  notification : number;
  private subsription_notification : Subscription; 
  constructor(private sharedService : SharedService, private requestService : RequestsService) { }

  ngOnInit(): void {
    this.sharedService.initializeAppLanguage();
    let user :User = this.sharedService.getUserFromLocalStorage();
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.requestService.getRequestsNotifications();
      this.subsription_notification= this.requestService.notificationUpdateListener().subscribe( (data : number) => {      
      this.notification = data;         
    });
  }


  changeLanguage(lang: string) {
    this.sharedService.changeLanguage(lang);
  }
  logout(){
    this.sharedService.logout();
  }

  ngOnDestroy(){
    this.subsription_notification.unsubscribe();
  }
}
