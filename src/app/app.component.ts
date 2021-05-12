import { Component } from '@angular/core';
import {AuthenticationService} from "./AuthenticationService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sunny\'s OAuth Demo';
  loginSubject: string = "";
  isLoggedIn = false;
  protectedResource: string;

  constructor(private authenticationService: AuthenticationService) {}

  checkStatus() {
    this.authenticationService.loginStatus().subscribe({next: () => {
        this.isLoggedIn = this.authenticationService.isLoggedIn;
        if(this.isLoggedIn) {
          this.loginSubject = this.authenticationService.sessionInfo.sub;
        }
      }, error: ()=>{
        console.error("Login status call failed.");
      }})
  }

  login() {
    this.authenticationService.loginUrl().subscribe({next: (url) => {
        window.open(url);
      }, error: ()=>{
        console.error("Login call failed.");
      }});
  }

  getResource() {
    this.authenticationService.getResourceFromServer().subscribe({next: (resource) => {
          this.protectedResource = resource;
      }, error: ()=>{
        console.error("Login call failed.");
      }});
  }

  logout() {
    this.authenticationService.logout().subscribe({next: () => {

      }, error: ()=>{
        console.error("Logout call failed.");
      }});
  }
}
