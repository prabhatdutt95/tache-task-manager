import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Router } from '@angular/router';
import * as $ from "jquery";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor( public location: Location, private router: Router) {}

  ngOnInit() {
    this.changeSideBarTheme();
  }

  changeSideBarTheme() {
    let $sidebar = $('.sidebar');
    let $sidebar_responsive = $('body > .navbar-collapse');
    $('.fixed-plugin .badge').click(function(){

      $(this).siblings().removeClass('active');
      $(this).addClass('active');
  
      var new_color = $(this).data('color');
  
      if($sidebar.length !== 0){
          $sidebar.attr('data-color', new_color);
      }
  
      if($sidebar_responsive.length != 0){
          $sidebar_responsive.attr('data-color',new_color);
      }
    });
  }
  

}
