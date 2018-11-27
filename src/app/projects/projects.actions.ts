import { Action } from '@ngrx/store';
import { Project } from './project.model';

export const SET_PROJECTS = '[Projects] Set Projects';
export const SELECT_PROJECT = '[Projects] Select Project';

export class SetProjects implements Action {
    readonly type = SET_PROJECTS;

    constructor(public payload: Project[]) {}
}

export class SelectProject implements Action {
    readonly type = SELECT_PROJECT;

    constructor(public payload: Project) {}
}


export type ProjectActions = SetProjects | SelectProject;
