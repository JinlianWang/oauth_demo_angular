import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthenticationService} from "./AuthenticationService";
import {Observable} from "rxjs";

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
  constructor(public authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authenticationService.sessionInfo != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authenticationService.sessionInfo.id}`
        }
      });
    }
    return next.handle(request);
  }
}
