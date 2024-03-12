import { Routes } from '@angular/router';
import { WelcomeComponent } from './component/dashboard/welcome.component';
import { StudentComponent } from './component/student/student.component';
import { ProgramComponent } from './component/program/program.component';
import { DetailComponent } from './component/details/detail.component';

export const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: 'students',
        component: StudentComponent
    },
    {
        path: 'programs',
        component: ProgramComponent
    },
    {
        path: 'detail',
        component: DetailComponent
    },
];