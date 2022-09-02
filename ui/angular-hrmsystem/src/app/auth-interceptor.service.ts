import { Injectable } from '@angular/core'; // imports the class that provides local storage for token
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, take, switchMap } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor {
  token(token: any) {
    throw new Error('Method not implemented.');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Interception In Progress"); // Interception Stage
    const token = localStorage.getItem('token'); // This retrieves a token from local storage
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });// This clones HttpRequest and Authorization header with Bearer token added
    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
 
    return next.handle(req)
        .pipe(
           catchError((error: HttpErrorResponse) => {
                // Catching Error Stage
                let errorMassage = '';
                if (error.error instanceof ErrorEvent) {
                    errorMassage= `Error: ${error.error.message}`;
                }
                else{
                  errorMassage= `Error code: ${error.status}\nMessage: ${error.message}`;
                }
                window.alert(errorMassage);;
                return throwError(() => errorMassage); // any further errors are returned to frontend                    
           })
        );
  }  
}