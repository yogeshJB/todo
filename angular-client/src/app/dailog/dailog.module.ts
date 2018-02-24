import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDailogComponent } from './confirm-dailog/confirm-dailog.component';
import { DialogService } from '../dialog.service';
import { MatButtonModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [ConfirmDailogComponent],
  exports: [ConfirmDailogComponent],
  entryComponents: [ConfirmDailogComponent],
  providers: [DialogService]
})
export class DailogModule { }
