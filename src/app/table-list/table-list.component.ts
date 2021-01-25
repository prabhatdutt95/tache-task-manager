import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  allTasks = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getTasks();
  }
  getTasks() {
    this.dataService.getTasks().subscribe(response => {
      this.allTasks = response;
    })
  }

}
