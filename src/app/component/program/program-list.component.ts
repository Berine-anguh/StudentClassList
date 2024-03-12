import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Program } from './../../types/Program'

@Component({
  selector: 'app-program-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  template: `
    <div>
        <h4>Programs-List</h4>
        <div class="top-nav">
           <div>
            <b>Total: {{dataSource.data.length}}</b>
           </div>
           <div>
             <b>Filtered: {{dataSource.filteredData.length}}</b>
           </div>
           <div></div>
           <div>
            <mat-form-field>
                <mat-label>Type name, program or gender</mat-label>
                <input matInput (keyup)="applyFilter($event)" placeholder="Type name, program or gender" #input>
            </mat-form-field>
           </div>
           <div>
            <button mat-flat-button  style="background-color: #2EB24B; color:white; " (click)="handleClick('create','')">Create</button>
           </div>
        </div>
        <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

        <!-- Checkbox Column -->
        <ng-container matColumnDef="select">
          <th mat-header-cell *matHeaderCellDef>
            <mat-checkbox (change)="$event ? toggleAllRows() : null"
                          [checked]="selection.hasValue() && isAllSelected()"
                          [indeterminate]="selection.hasValue() && !isAllSelected()"
                          [aria-label]="checkboxLabel()">
            </mat-checkbox>
          </th>
          <td mat-cell *matCellDef="let row">
            <mat-checkbox (click)="$event.stopPropagation()"
                          (change)="$event ? selection.toggle(row) : null"
                          [checked]="selection.isSelected(row)"
                          [aria-label]="checkboxLabel(row)">
            </mat-checkbox>
          </td>
        </ng-container>

        <!-- Position Column -->
        <ng-container matColumnDef="position">
          <th mat-header-cell *matHeaderCellDef> No. </th>
          <td mat-cell *matCellDef="let element; let i = index"> {{i + 1}} </td>
        </ng-container>

        
        <ng-container matColumnDef="firstName">
          <th mat-header-cell *matHeaderCellDef> Name </th>
          <td mat-cell *matCellDef="let element"> {{element.firstName}} </td>
        </ng-container>

        <ng-container matColumnDef="lastName">
          <th mat-header-cell *matHeaderCellDef>  </th>
          <td mat-cell *matCellDef="let element"> {{element.lastName}} </td>
        </ng-container>

        <ng-container matColumnDef="gender">
          <th mat-header-cell *matHeaderCellDef>  </th>
          <td mat-cell *matCellDef="let element"> {{element.gender}} </td>
        </ng-container>

        <ng-container matColumnDef="program">
          <th mat-header-cell *matHeaderCellDef> </th>
          <td mat-cell *matCellDef="let element"> {{element.program}} </td>
        </ng-container>

        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef> Actions </th>
          <td mat-cell *matCellDef="let element">  
             <button mat-flat-button  (click)="handleClick('detail', element.id)">Detail</button>
              <button mat-flat-button style="background-color:#4388CD; color:white; " (click)="handleClick('edit', element.id)">Edit</button>
               <button mat-flat-button style="background-color: #EE6967; color:white;" (click)="handleClick('delete', element.id)">Delete</button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;">
        </tr>
      </table>
    </div>
  `,
  styles: [`
    .top-nav {
      display: flex;
      flex-direction: row;
      padding: 10px 0;
    }
    .top-nav > div {
      padding: 5px;
    }
    .top-nav > div:nth-child(4) {
      flex-grow: 1;
    }
    table{
      width:100%;
    }
    th{
      background-color:#A6A4A3 !important;
    }
    tr:nth-child(even) {
      background-color:#D9D9D9;
    }
    tr:nth-child(odd) {
  background-color:#F4F4EF;
}
  `]
})
export class ProgramListComponent implements OnInit, OnChanges {
  
  @Input() programs: Program[] = [];
  @Output() onAction: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = ['select', 'position', 'firstName', 'lastName','gender', 'program', 'action'];
  dataSource = new MatTableDataSource<Program>([]);
  selection = new SelectionModel<Program>(true, []);

  ngOnInit() {
    this.dataSource.data = this.programs;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['programs']) {
      this.dataSource.data = changes['programs'].currentValue;
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Program): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  handleClick(action: string, id: string) {
    this.onAction.emit({action, id})
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}