import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./AuthenticationService";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'OAuth Demo';
  loginSubject: string = "";
  isLoggedIn = false;
  protectedResource: string;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const sessionId = params['session'];
      if(sessionId != null) {
        this.authenticationService.setSessionId(sessionId);
        console.log("Session ID found: " + sessionId);
      }
      //Always check for status as users may refresh the page manually through browser refresh button
      this.checkStatus();
    });
  }

  checkStatus() {
    this.authenticationService.loginStatus().subscribe({next: () => {
        this.isLoggedIn = this.authenticationService.sessionInfo != null;
        if(this.isLoggedIn) {
          this.loginSubject = this.authenticationService.sessionInfo.username;
          this.getResource();
          //Workaround to remove session id from query parameter.
          this.router.navigate([], {queryParams: {session: null}, queryParamsHandling: 'merge'});
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
        this.isLoggedIn = (this.authenticationService.sessionInfo != null);
      }, error: ()=>{
        console.error("Logout call failed.");
      }});
  }
}

