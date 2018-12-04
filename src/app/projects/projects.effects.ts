import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { ProjectsService } from './projects.service';
import { switchMap, map } from 'rxjs/operators';
import { ADD_PROJECT, ProjectAdded } from './projects.actions';

@Injectable()
export class ProjectsEffects {
    @Effect() add$: Observable<Action> = this.actions$.ofType(ADD_PROJECT)
    .pipe(
        switchMap((action: any) => {
            return from(this.projectsService.addProject(action.payload))
            .pipe(map(res => {
                return new ProjectAdded(res);
            }));
        })
    );

    constructor(
        private actions$: Actions,
        private projectsService: ProjectsService
    ) {}
}
