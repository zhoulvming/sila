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
    return this.http.get('/flow/getListData_hour').toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  getPieData(): Promise<any> {
    return this.http.get('/flow/getPieData').toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  getBarData1(): Promise<any> {
    return this.http.get('/flow/getBarData1').toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  getListData1(): Promise<any> {
    return this.http.get('/flow/getListData1').toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  getListData2(): Promise<any> {
    return this.http.get('/flow/getListData2').toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  getTop10ListData(): Promise<any> {
    return this.http.get('/flow/getTop10ListData').toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  

}