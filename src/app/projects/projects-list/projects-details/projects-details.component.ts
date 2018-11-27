import { Component, OnInit, Input } from '@angular/core';

import { ProjectsService } from '../../projects.service';
import { MatDialog } from '@angular/material';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.css']
})
export class ProjectsDetailsComponent implements OnInit {
  @Input() project;
  @Input() index;

  constructor(private projectsService: ProjectsService,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
  }

  onEdit(selectedId) {
    const dialogRef = this.dialog.open(EditProjectComponent, {
      data: this.project
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.projectsService.editProject(result, selectedId);
      }
    });
  }

  onDelete(selectedId) {
    this.projectsService.deleteProject(selectedId);
  }

  onCommentsUpdate(selectedId) {
    this.router.navigate(['/projects/edit', this.index, selectedId]);
  }

  onStatusUpdate(project, status) {
    project.status = status;
    this.projectsService.editProject(project, project.id);
    this.router.navigate(['/projects/projects-list']);
  }
}
