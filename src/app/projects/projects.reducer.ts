import { ProjectActions, SET_PROJECTS, SELECT_PROJECT } from './projects.actions';

import { Project } from './project.model';
import * as fromRoot from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProjectsState {
    projects: Project[];
    selectedProject: Project;
}

export interface State extends fromRoot.State {
    projects: ProjectsState;
}

const initialState: ProjectsState = {
    projects: [],
    selectedProject: null
};

export function projectsReducer (state = initialState, action: ProjectActions) {
    switch (action.type) {
        case SET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            };
        case SELECT_PROJECT:
        return {
            ...state,
            activeTraining: { ...state.projects.find(ex => ex.id === action.payload)}
        };
      default:
        return state;
    }
}


export const getProjectsState = createFeatureSelector<ProjectsState>('projects');

export const getProjects = createSelector(getProjectsState, (state: ProjectsState) => state.projects);
export const getSelectedProject = createSelector(getProjectsState, (state: ProjectsState) => state.selectedProject);
