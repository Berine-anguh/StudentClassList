import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface DialogData {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  program: string;
}

@Component({
  selector: 'app-program-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  template: `
    <div>
        <h4 style="margin: 25px;">Program Form</h4>
        <mat-dialog-content>
          <div>
            <div>
                <mat-form-field style="width: 100%;">
                  <mat-label> Name</mat-label>
                  <input matInput [(ngModel)]="data.firstName">
                </mat-form-field>
            </div>
            <div >
                <mat-form-field style="height: 250px; width:100%;">
                  <mat-label>Description</mat-label>
                  <input matInput [(ngModel)]="data.lastName">
                </mat-form-field>
            </div>

          </div>
          
        </mat-dialog-content>
        <mat-dialog-actions>
           <button mat-button style=" border:solid black 1px; margin-left:px; "(click)="onNoClick()">Cancel</button>
           <button mat-button style="background-color:#4388CD; color:white; margin-left:450px; "[mat-dialog-close]="data" cdkFocusInitial>Submit</button>
        </mat-dialog-actions>
        
    </div>
  `,
  styles: [`
  mat-form-field{
    width:700px;
  }
  `]
})
export class ProgramFormComponent {
  title = 'client-angular';

  constructor(
    public dialogRef: MatDialogRef<ProgramFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}