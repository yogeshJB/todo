import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatTabsModule,
  MatCardModule,
  MatGridListModule,
  MatTableModule,
  MatIconModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatDialog,
  MatDialogModule
} from '@angular/material';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { TodoRoutingModule } from './todo/todo-routing/todo-routing.module';

import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoDetailComponent } from './todo/todo-detail/todo-detail.component';

import { ConfirmDailogComponent } from './dailog/confirm-dailog/confirm-dailog.component';
import { UserComponent } from './user/user.component';

import { UserService } from './services/user.service';
import { TodoService } from './todo.service';
import { DialogService } from './dialog.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoListComponent,
    TodoDetailComponent,
    ConfirmDailogComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,

    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TodoRoutingModule,

    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDialogModule
  ],
  entryComponents: [ConfirmDailogComponent],
  providers: [UserService, TodoService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
