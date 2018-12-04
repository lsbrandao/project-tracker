import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProjectsComponent } from './projects.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { ProjectsDetailsComponent } from './projects-list/projects-details/projects-details.component';
import { EditProjectComponent } from './projects-list/projects-details/edit-project/edit-project.component';
import { ProjectJournalComponent } from './projects-list/projects-details/project-journal/project-journal.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { StoreModule } from '@ngrx/store';
import { projectsReducer } from './projects.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProjectsEffects } from './projects.effects';

@NgModule({
    declarations: [
        ProjectsComponent,
        NewProjectComponent,
        ProjectsTableComponent,
        ProjectsDetailsComponent,
        EditProjectComponent,
        ProjectJournalComponent,
        ProjectsListComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        ProjectsRoutingModule,
        StoreModule.forFeature('projects', projectsReducer),
        EffectsModule.forFeature([ProjectsEffects])
    ],
    providers: [ProjectsEffects],
    entryComponents: [EditProjectComponent]
})
export class ProjectsModule {}
