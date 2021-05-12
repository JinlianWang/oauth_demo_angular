import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./AuthenticationService";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Sunny\'s OAuth Demo';
  loginSubject: string = "";
  isLoggedIn = false;
  protectedResource: string;

  constructor(private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const sessionId = params['session'];
      if(sessionId != null) {
        console.log("Session ID found: " + sessionId);
        this.checkStatus();
      }
    });
  }

  checkStatus() {
    this.authenticationService.loginStatus().subscribe({next: () => {
        this.isLoggedIn = this.authenticationService.isLoggedIn;
        if(this.isLoggedIn) {
          this.loginSubject = this.authenticationService.sessionInfo.username;
        }
      }, error: ()=>{
        console.error("Login status call failed.");
      }})
  }

  login() {
    this.authenticationService.loginUrl().subscribe({next: (url) => {
        window.open(url,"_self");
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

