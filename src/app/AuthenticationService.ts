import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {any} from "codelyzer/util/function";
import {catchError, tap} from "rxjs/operators";
import {SessionInfo} from "./SessionInfo";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private hostUrl: string = "https://fp6god49v7.execute-api.us-east-1.amazonaws.com/prod";
  public isLoggedIn: boolean = false;
  public sessionInfo: SessionInfo;

  constructor(private http: HttpClient) {}

  loginStatus(): Observable<any> {
    return this.http.get(this.hostUrl + "/apis/authentication/status").pipe(tap((sessionInfo: SessionInfo) => {
      if(sessionInfo.id != null) {
        this.sessionInfo = sessionInfo;
        this.isLoggedIn = true;
      } else {
        this.sessionInfo = null;
        this.isLoggedIn = false;
      }
    }, catchError(this.handleError)));
  }

  loginUrl(): Observable<string> {
    return this.http.get(this.hostUrl + "/apis/authentication/login", {responseType: 'text' as 'json'}).pipe(tap((loginUrl: string) => {
      console.log("Redirecting to: " + loginUrl);
    }, catchError(this.handleError)));
  }

  logout(): Observable<any> {
    return this.http.get(this.hostUrl + "/apis/authentication/logout").pipe(tap(() => {
      console.log("Logout successfully!");
    }, catchError(this.handleError)));
  }

  getResourceFromServer(): Observable<string> {
    return this.http.get(this.hostUrl + "/apis/authentication/resource").pipe(tap((resource: string) => {
      console.log("Resource retrieved: " + resource);
    }, catchError(this.handleError)));
  }

  handleError(error: HttpErrorResponse) {
    const errorMessage = "Oops, we hit a snag: " + error.message;
    console.log(errorMessage);
    return throwError(errorMessage)
  }
}
