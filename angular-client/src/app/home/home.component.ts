import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   option = {
      length : 50,
      pageSize : 5,
      pageSizeOptions : [5, 10, 25, 50],
      pageIndex: 0
    };
    
  tiles = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
  todos: any[] = [];
  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoService.getTodos(this.option)
      .then(todos => this.todos = todos.todos.reverse().slice(0, 3));
  }

}
