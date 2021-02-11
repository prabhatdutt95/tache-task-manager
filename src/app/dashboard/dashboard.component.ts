import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataService } from '../data.service';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  allTasks = [];
  lowPriorityTasks = [];
  mediumPriorityTasks = [];
  highPriorityTasks = [];
  filteredTask;
  tasksLoaded = false;
  priorities = [
    'Low', 'Medium', 'High'
  ]
  editTask= {
    message: '',
    due_date: new Date(),
    assigned_to: null,
    priority: 'Low',
    id: null
  }
  users:[];
  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.getTasks();
    this.getUsers();
  }

  getTasks() {
    this.dataService.getTasks().subscribe(response => {
      this.allTasks = response;
      this.filterTasksByPriority();
      this.tasksLoaded = true;
    })
  }
  getUsers() {
    this.dataService.getUsers().subscribe(response => {
      this.users = response.users;
    })
  }

  addTask() {
    this.dataService.createTask(this.editTask).subscribe(response => {
      this.allTasks.push(response);
      this.filterTasksByPriority();
      $('#myModal').modal('hide');
      this.resetEditTask();
    })
  }
  updateTask() {
    this.dataService.updateTask(this.editTask).subscribe(response => {
      this.updateDetails(response);
      this.resetEditTask();
    })
  }

  updateDetails(response) {
    this.allTasks = this.allTasks.filter(_ => _.id != this.editTask.id);
    this.allTasks.push(response);
    this.filterTasksByPriority();
    $('#myModal').modal('hide');
  }
  delete(id) {
    this.dataService.deleteTask(id).subscribe(res => {
      this.allTasks = this.allTasks.filter(_ => _.id != id);
      console.log(this.allTasks)
      this.filterTasksByPriority();
    })
  }
  trackByChange(index: number, task: any): string {
    return task.id;
  }
  resetEditTask() {
    this.editTask= {
      message: '',
      due_date: new Date(),
      assigned_to: null,
      priority: 'Low',
      id: null
    }
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.editTask = this.allTasks.find(_ => _.id == event.item.element.nativeElement.id);
      this.editTask.priority = this.lowPriorityTasks.includes(this.editTask) ? 'Low' : 
                              this.mediumPriorityTasks.includes(this.editTask) ? 'Medium' : 'High';
      this.updateTask();
    }
  }
  filterTasksByPriority() {
    this.lowPriorityTasks = [];
    this.mediumPriorityTasks = [];
    this.highPriorityTasks = [];
    this.allTasks.forEach((task, index) => {
      if (task.priority === 'Low') {
        this.lowPriorityTasks.push(task);
      } else if (task.priority === 'Medium'){
        this.mediumPriorityTasks.push(task);
      } else {
        this.highPriorityTasks.push(task);
      }
    })
  }

}
