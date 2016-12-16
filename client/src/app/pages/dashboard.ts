import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  templateUrl: './dashboard.html'
})
export class DashboardPage implements OnInit {
  constructor() { }

  ngOnInit() {

    $('.message .close')
      .on('click', function() {
        $(this)
          .closest('.message')
          .transition('fade')
        ;
      })
    ;


  }
}