import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  users = [];
  constructor(private dataService: DataService) { }
  
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.dataService.getUsers().subscribe(response => {
      this.users = response.users;
    })
  }
}
