import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import ls from 'localstorage-slim';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private titleService : Title,private router:Router , private translateService : TranslateService) { }
  lang = "en-US";

  putTokenInLocalStorage(token : string){
    ls.set('id_token', token, { encrypt: true });
  }
  getTokenFromLocalStorage() : string{
    return ls.get('id_token', { decrypt: true });
  }

  putUserInLocalStorage(user: User){
    ls.set('user', user,  { encrypt: true });
  }
  getUserFromLocalStorage() : User{
    return ls.get('user', { decrypt: true });
  }

  getLanguageFromLocalStorage(){
    return localStorage.getItem('lang');
  }
  UPDATE_LEAVES_LEFT_IN_LOCAL_STORAGE(leaves_left: number){
    let user = this.getUserFromLocalStorage();
    user.leaves_left = leaves_left;
    this.putUserInLocalStorage(user);
  }
  UPDATE_USER_IN_LOCAL_STORAGE(user: User){
    let userLocal = this.getUserFromLocalStorage();
    userLocal.firstName = user.firstName;
    userLocal.lastName = user.lastName;
    userLocal.email = user.email;
    userLocal.phone = user.phone;
    userLocal.cin = user.cin;
    userLocal.job_title = user.job_title;
    userLocal.department = user.department;
    //put user in local storage
    this.putUserInLocalStorage(userLocal);
  }

  changeLanguage(lang: string){
    this.translateService.use(lang);
    this.translateService.setDefaultLang(lang);   
    localStorage.setItem('lang', lang); 
  }

  initializeAppLanguage(){
    let lang = this.getLanguageFromLocalStorage();
    if (lang){
    this.translateService.setDefaultLang(lang);
    }else{
      this.translateService.setDefaultLang('en-US');
    }
  }

  logout(){
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
    this.titleService.setTitle('CLS');
    this.router.navigate(['/']);
  }
}
