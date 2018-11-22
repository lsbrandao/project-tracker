import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthGuard } from './auth/auth.guard';
import { ProjectsTableComponent } from './projects/projects-table/projects-table.component';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { ProjectJournalComponent } from './projects/projects-list/projects-details/project-journal/project-journal.component';

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard], children: [
        { path: 'projects-list', component: ProjectsListComponent },
        { path: 'new-project', component: NewProjectComponent },
        { path: 'projects-table', component: ProjectsTableComponent },
        { path: 'edit/:index/:id', component: ProjectJournalComponent },
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard],
    declarations: [],
})
export class AppRoutingModule { }
