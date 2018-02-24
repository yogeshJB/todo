import { Component, OnInit, ViewChild, Input, Inject  } from '@angular/core';
import { TodoService } from '../../todo.service';
import { PageEvent, MatPaginator, MatTableDataSource } from '@angular/material';
import { DialogService } from '../../dialog.service';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  todos: any;
  todo: any = {};
  todoToEdit: any = {};
  apiMessage: string;
  todoToDelete: any = {};

  // MatPaginator Inputs
  option = {
    length: 50,
    pageSize: 5,
    pageSizeOptions: [5, 10, 25, 50],
    pageIndex: 0
  };

  displayedColumns = ['fullName', 'todoText', 'createdAt', 'Action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // dataSource = new MatTableDataSource(this.todos);

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.option.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  constructor(private todoService: TodoService, private dialogService: DialogService) { }

  ngOnInit(): void {
    // this.todoService.getTodos()
    //   .then(td => this.todos = new MatTableDataSource(td.todos));
    this.todoService.showAddTodoBox = true;
    this.todoList(this.option);
  }

  todoList(event) {
    console.log(event);
    // this.option.pageSize = event.pageSize;
    this.todoService.getTodos(event)
      .then(td => {
        this.option.length = td.count;
        this.todos = new MatTableDataSource(td.todos);
      });
  }
  AddTodo(todo: any): void {
    if (!todo) { return; }
    this.todoService.createTodo(todo)
      .then(td => {
        console.log(td);
        // this.todos.push(td.todo);
        this.todoList(this.option);
      });
  }

  showEditTodo(todo: any): void {

    this.todoToEdit = todo;
    this.apiMessage = '';
  }

  EditTodo(todo: any): void {
    if (!todo) { return; }
    todo.id = this.todoToEdit._id;
    this.todoService.updateTodo(todo)
      .then(td => {
        const updatedTodos = this.todos.filteredData.map(t => {
          if (td.todo._id !== t._id) {
            return t;
          }
          return { ...t, ...td.todo };
        });
        this.apiMessage = td.message;
        this.todos = updatedTodos;
      });
  }

  showDeleteTodo(todo: any): void {
    this.dialogService.confirm('Confirm Dialog', 'Are you sure you want to do this?').subscribe(res => {
      // this.result = res
      console.log('Confirm Dialog response', res);
      if (res) {
        this.todoToDelete = todo;
        this.apiMessage = '';

        this.todoService.deleteTodo(todo)
      .then(res => {
        this.apiMessage = res.message;
        if (res.success) {
          // this.todoList(this.option);
          const filteredTodos = this.todos.filteredData.filter(t => t._id !== todo._id);
          this.todos = new MatTableDataSource(filteredTodos);
        }
      });
      }
    });
  }
}
