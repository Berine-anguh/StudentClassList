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
  selector: 'app-student-form',
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
        <h4>Student Form</h4>
        <mat-dialog-content>
          <div>
            <div>
                <mat-form-field>
                  <mat-label>First Name</mat-label>
                  <input matInput [(ngModel)]="data.firstName">
                </mat-form-field>
            </div>
            <div >
                <mat-form-field>
                  <mat-label>Last Name</mat-label>
                  <input matInput [(ngModel)]="data.lastName">
                </mat-form-field>
            </div>
            <div>
                <mat-form-field>
                  <mat-label>Gender</mat-label>
                  <input matInput [(ngModel)]="data.gender">
                </mat-form-field>
            </div>
            <div>
               <mat-form-field>
                  <mat-label >Program</mat-label>
                  <input matInput [(ngModel)]="data.program">
                </mat-form-field>
            </div>

          </div>
          
        </mat-dialog-content>
        <mat-dialog-actions>
          <button mat-button style=" border:solid black 1px;  "(click)="onNoClick()">Cancel</button>
          <button mat-button style="background-color:#4388CD; color:white; margin-left:450px !important; "[mat-dialog-close]="data" cdkFocusInitial>Submit</button>
        </mat-dialog-actions>
        
    </div>
  `,
  styles: [`
  mat-form-field{
  width:100%

}
  `]
})
export class StudentFormComponent {
  title = 'client-angular';

  constructor(
    public dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}