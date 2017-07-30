import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class VisitorService {
  constructor(public http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An service error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  // getVisitorDataByProvince(startDate,endDate,idSite): Promise<any> {
  //   return this.http.get('/visitorAnalysis/getVisitorIpMap?startDate='+startDate+'&endDate='+endDate+'&siteId='+idSite).toPromise()
  //     .then(response => {
  //       //return response.json();


  //       return [
  //         {"province": '江苏1', "ip_num": '20'},
  //         {"province": '江苏2', "ip_num": '30'},
  //         {"province": '江苏3', "ip_num": '40'}
  //       ]


  //     })
  //     .catch(this.handleError);
  // }

  getVisitorDataByProvince(): any {
    return [
          {"province": '江苏1', "ip_num": '20'},
          {"province": '江苏2', "ip_num": '30'},
          {"province": '江苏3', "ip_num": '40'}
        ]
  }
  
}