import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Project } from '../project.model';
import { ProjectsService } from '../projects.service';
import { MatDialog } from '@angular/material';
import { EditProjectComponent } from './edit-project.component';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.css']
})
export class ProjectsDetailsComponent implements OnInit, OnDestroy {
  projects: Project[];
  projectsSubscription: Subscription;
  openJournal = false;

  constructor(private projectsService: ProjectsService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.projects = this.projectsService.getProjects();
    this.projectsSubscription = this.projectsService.projectsChanged.subscribe(projects => {
      this.projects = projects;
    });
  }

  openDialog(i) {
    const dialogRef = this.dialog.open(EditProjectComponent, {
      data: this.projects[i]
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.projectsService.editProject(result.value, i);
      }
    });
  }

  onDelete(index: number) {
    this.projectsService.deleteProject(index);
  }

  onUpdate() {
    this.openJournal = true;
  }

  ngOnDestroy(): void {
    this.projectsSubscription.unsubscribe();
  }

}
