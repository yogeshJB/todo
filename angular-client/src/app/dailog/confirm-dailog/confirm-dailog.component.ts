import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dailog',
  templateUrl: './confirm-dailog.component.html',
  styleUrls: ['./confirm-dailog.component.css']
})
export class ConfirmDailogComponent {
  public title: string;
  public message: string;
  constructor(public dialogRef: MatDialogRef<ConfirmDailogComponent>) {

  }

}
