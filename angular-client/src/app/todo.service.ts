import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/toPromise';  // way to manage asynchronous data

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TodoService {
  private apiUrl = 'http://localhost:3001/';
  showAddTodoBox = true;

  constructor(private http: HttpClient) { }

  getTodos(query): Promise<any> {
    let q = '';
    if (query && query.pageSize) {
      q = `page=${query.pageIndex + 1}&limit=${query.pageSize}`;
    }
    return this.http.get(`${this.apiUrl}todo?${q}`)
      .toPromise()
      // .then(this.handleData(res => this.handleData(res)))
      .then(res => {
        // this.handleData(res);
        return res;
      })
      .catch(this.handleError);
  }

  // getTodos(query): Promise<any> {
  //   let q = '';
  //   if (query && query.pageSize) {
  //     q = `page=${query.pageIndex + 1}&limit=${query.pageSize}`;
  //   }
  //   return this.http.get(`${this.apiUrl}todo?${q}`)
  //     .pipe(
  //       tap(heroes => this.log(`fetched heroes`)),
  //       catchError(this.handleError('getHeroes', []))
  //     );
  // }

  getTodo(id): Promise<any> {
    return this.http.get(this.apiUrl + 'todo/' + id)
      .toPromise()
      // .then(this.handleData)
      .then(res => {
        // this.handleData(res);
        return res;
      })
      .catch(this.handleError);
  }

  createTodo(todo: any): Promise<any> {
    return this.http.post(this.apiUrl + 'todo', todo, httpOptions)
      .toPromise()
      // .then(this.handleData)
      .then(res => {
        // this.handleData(res);
        return res;
      })
      .catch(this.handleError);
  }

  updateTodo(todo: any): Promise<any> {
    return this.http
      .put(this.apiUrl + 'todo', todo, httpOptions)
      .toPromise()
      // .then(this.handleData)
      .then(res => {
        // this.handleData(res);
        return res;
      })
      .catch(this.handleError);
  }

  deleteTodo(todo: any): Promise<any> {
    return this.http
      .delete(this.apiUrl + 'todo/' + todo._id, httpOptions)
      .toPromise()
      // .then(this.handleData)
      .then(res => {
        // this.handleData(res);
        return res;
      })
      .catch(this.handleError);
  }

  private handleData(res) {
    const body = res.json();
    console.log(body);
    return body || {};
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // show toaster effect
    console.log(message);
  }
}
