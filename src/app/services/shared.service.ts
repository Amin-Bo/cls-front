import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import ls from 'localstorage-slim';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private router:Router , private translateService : TranslateService) { }
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
    this.router.navigate(['/']);
  }
}
