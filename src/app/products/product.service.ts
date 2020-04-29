import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IProduct } from './product';


const httpOptions: any = {
  headers: null
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // If using Stackblitz, replace the url with this line
  // because Stackblitz can't find the api folder.
  // private productUrl = 'assets/products/products.json';
  private productUrl = 'https://firebasestorage.googleapis.com/v0/b/firest-8affa.appspot.com/o/products.json?alt=media&token=4729b326-9e3f-410e-a5f5-806c5f330463';

  constructor(private http: HttpClient) { }
 private addHeaders(): HttpHeaders {
        let headers: HttpHeaders = new HttpHeaders();

         headers = headers.append("Access-Control-Allow-Origin", '*');
        return headers;
    }

  getProducts(): Observable<IProduct[]> {
     httpOptions.headers = this.addHeaders();

  return this.http.get<IProduct[]>(this.productUrl,{headers :this.addHeaders()})
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );

     // return observableObj;
  }

  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.productId === id))
      );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
