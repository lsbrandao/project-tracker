import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { ProjectJournalComponent } from './projects-list/projects-details/project-journal/project-journal.component';

const routes: Routes = [
    { path: '', component: ProjectsComponent, children: [
        { path: 'projects-list', component: ProjectsListComponent },
        { path: 'new-project', component: NewProjectComponent },
        { path: 'projects-table', component: ProjectsTableComponent },
        { path: 'edit/:index/:id', component: ProjectJournalComponent },
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProjectsRoutingModule {}
