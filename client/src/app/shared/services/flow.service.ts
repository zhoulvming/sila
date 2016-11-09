import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FlowService {
  constructor(public http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An service error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getListData_Hour(): Promise<any> {
    return this.http.get('http://localhost:3000/flow/getListData_hour').toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

}