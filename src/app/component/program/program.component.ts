import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramListComponent } from './program-list.component';
import { MatDialog } from '@angular/material/dialog';
import { ProgramFormComponent } from './program-form.component';
import { Program } from '../../types/Program';
import { ConfirmActionDialog } from '../../utils/components/confirm-action-diaglog.component';
import { PROGRAM_DATA } from '../../utils/data/program';

@Component({
  selector: 'app-program',
  standalone: true,
  imports: [CommonModule, ProgramListComponent],
  template: `
    <div>
        <h3>Programs</h3>
        <app-program-list
          [programs] = "programs"
          (onAction)="handleAction($event)"></app-program-list>
    </div>
  `,
  styles: [`
  
  `]
})
export class ProgramComponent implements OnInit {
  title = 'client-angular';
  name = 'Tester';
  animal = 'test'
 programs: Program[] = [];
  initStudent: Program = {
    id: '',
    firstName: '',
    lastName: '',
    gender: '',
    program: ''
  };

  program: Program | null = null;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.programs = PROGRAM_DATA;
  }

  openDialog(isEdit = false): void {
    const dialogRef = this.dialog.open(ProgramFormComponent, {
      width: '50%',
      data: !isEdit ? {...this.initStudent} : this.program,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id === '') {
          const students = this.programs
          const count = this.programs.length;
          result.id = `${count + 1}`;
          students.push(result);
          this.programs = [...this.programs];
        } else {
          const student: any = this.programs.find((obj) => obj.id === result.id);
          const i = this.programs.indexOf(student);
          this.programs[i] = result;
        }
      }
    });
  }

  openDeleteDialog(id: any, enterAnimationDuration: string, exitAnimationDuration: string) {
    const deleteRef = this.dialog.open(ConfirmActionDialog, {
      data: id,
      enterAnimationDuration,
      exitAnimationDuration

    });

    deleteRef.componentInstance.onDelete.subscribe({
      next: (val: any) => {
        const programs = this.programs;
        this.programs = programs.filter((obj: any) => obj.id !== val);
      }
    })
  }
  
  handleAction(event: any) {
    switch(event.action) {
      case 'create':
        this.openDialog();
        break;
      case 'edit':
        this.program = this.programs.find((obj) => obj.id === event.id) || null;
        this.openDialog(true);
        break;
      case 'delete':
        this.openDeleteDialog(event.id, '3000ms', '1500ms');
        break;
      default:
        ;
    }
  }
}