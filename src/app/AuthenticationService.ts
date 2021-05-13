import {Injectable} from "@angular/core";
import {Observable, of, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {SessionInfo} from "./SessionInfo";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private hostUrl: string = "https://fp6god49v7.execute-api.us-east-1.amazonaws.com/prod";
  private static CONST_SESSION_INFO = "SESSION_INFO";

  //Populated in 3 cases: when read from session storage; when id from query string at which time its sub is empty; when login successfully
  public sessionInfo: SessionInfo;

  constructor(private http: HttpClient) {}

  loginStatus(): Observable<any> {
    if(this.sessionInfo == null) {
      this.sessionInfo = JSON.parse(sessionStorage.getItem(AuthenticationService.CONST_SESSION_INFO));
      if(this.sessionInfo != null && (this.sessionInfo.expirationTime > Date.now())) {
        return of(this.sessionInfo);
      }
      this.sessionInfo = null;
      sessionStorage.removeItem(AuthenticationService.CONST_SESSION_INFO);
      return of(null);
    }

    return this.http.get(this.hostUrl + "/apis/authentication/status").pipe(tap((sessionInfo: SessionInfo) => {
      if(sessionInfo.id != null) {
        this.sessionInfo = sessionInfo;
        sessionStorage.setItem(AuthenticationService.CONST_SESSION_INFO, JSON.stringify(this.sessionInfo));
      } else {
        this.sessionInfo = null;
      }
    }, catchError(this.handleError)));
  }

  loginUrl(): Observable<string> {
    //Have to pass in options to spell out that response type is 'text'; otherwise angular would try to parse as json and fails.
    return this.http.get(this.hostUrl + "/apis/authentication/login", {responseType: 'text' as 'json'}).pipe(tap((loginUrl: string) => {
      console.log("Redirecting to: " + loginUrl);
    }, catchError(this.handleError)));
  }

  logout(): Observable<any> {
    return this.http.get(this.hostUrl + "/apis/authentication/logout").pipe(tap(() => {
      this.sessionInfo = null;
      sessionStorage.removeItem(AuthenticationService.CONST_SESSION_INFO);
      console.log("Logout successfully!");
    }, catchError(this.handleError)));
  }

  getResourceFromServer(): Observable<string> {
    //Have to pass in options to spell out that response type is 'text'; otherwise angular would try to parse as json and fails.
    return this.http.get(this.hostUrl + "/apis/authentication/resource", {responseType: 'text' as 'json'}).pipe(tap((resource: string) => {
      console.log("Resource retrieved: " + resource);
    }, catchError(this.handleError)));
  }

  setSessionId(sessionId: string) {//Only used when the session id is passed from query string.
    this.sessionInfo = new SessionInfo();
    this.sessionInfo.id = sessionId;
  }

  handleError(error: HttpErrorResponse) {
    const errorMessage = "Oops, we hit a snag: " + error.message;
    console.log(errorMessage);
    return throwError(errorMessage)
  }
}
