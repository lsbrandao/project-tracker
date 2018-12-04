import { Action } from '@ngrx/store';
import { Project } from './project.model';

export const SET_PROJECTS = '[Projects] Set Projects';
export const SELECT_PROJECT = '[Projects] Select Project';
export const ADD_PROJECT = '[Projects] Add Project';
export const ADD_PROJECT_SUCCESS = '[Projects] Project added';

export class SetProjects implements Action {
    readonly type = SET_PROJECTS;

    constructor(public payload: Project[]) {}
}

export class SelectProject implements Action {
    readonly type = SELECT_PROJECT;

    constructor(public payload: string) {}
}

export class AddProject implements Action {
    readonly type = ADD_PROJECT;

    constructor(public payload: Project) {}
}

export class ProjectAdded implements Action {
    readonly type = ADD_PROJECT_SUCCESS;

    constructor(public payload: any) {}
}


export type ProjectActions = SetProjects | SelectProject | AddProject | ProjectAdded;

