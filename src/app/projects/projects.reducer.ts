import { ProjectActions, SET_PROJECTS, SELECT_PROJECT } from './projects.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Project } from './project.model';
import * as fromRoot from '../app.reducer';

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
            selectedProject: { ...state.projects.find(proj => proj.id === action.payload)}
        };
      default:
        return state;
    }
}


export const getProjectsState = createFeatureSelector<ProjectsState>('projects');

export const getProjects = createSelector(getProjectsState, (state: ProjectsState) => state.projects);
export const getSelectedProject = createSelector(getProjectsState, (state: ProjectsState) => state.selectedProject);
export const getSelectedProjectComments = createSelector(getProjectsState, (state: ProjectsState) => state.selectedProject.journalComments);
