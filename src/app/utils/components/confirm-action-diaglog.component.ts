import { Inject, Component, EventEmitter } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'confirm-action-dialog',
    standalone: true,
    imports: [
      MatButtonModule,
      MatDialogModule
    ],
    template: `
      <div>
        <h1 mat-dialog-title>Delete record</h1>
        <div mat-dialog-content>
          Are you sure want to delete this record?
        </div>
        <div class="actions" mat-dialog-actions>
          <button mat-button mat-dialog-close>No</button>
          <button class="btn-danger" mat-button mat-dialog-close (click)="onButtonClick()" cdkFocusInitial>Yes</button>
        </div>
      </div>
    `,
  })
  export class ConfirmActionDialog {
    constructor(
      public dialogRef: MatDialogRef<ConfirmActionDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

    onDelete = new EventEmitter();

    onButtonClick() {
      this.onDelete.emit(this.data);
    }

  }