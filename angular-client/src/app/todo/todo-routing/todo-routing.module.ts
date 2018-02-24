import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';

const todoRoutes: Routes = [
  { path: 'todos', component: TodoListComponent },
  { path: 'todo/:id', component: TodoDetailComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(todoRoutes)
  ],
  exports: [
    RouterModule,
  ],
  declarations: []
})
export class TodoRoutingModule { }
