import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ConfirmDailogComponent } from './dailog/confirm-dailog/confirm-dailog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MatDialogRef<any>;

        dialogRef = this.dialog.open(ConfirmDailogComponent);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }

}
