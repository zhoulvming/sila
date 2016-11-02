import { Component } from '@angular/core';

import { ActivatedRoute, Router, Params }   from '@angular/router';
import { AppUtil } from './shared/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public appUtil: AppUtil,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  gotoCommunity(channel) {
    let link = ['/topics/' + channel, 'all'];
    this.router.navigate(link);
  }

}
