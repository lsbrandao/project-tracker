import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { JournalComment } from './journal-comment.model';
import { ProjectsService } from '../../../projects.service';
import { Subscription } from 'rxjs';
import { Project } from '../../../project.model';

@Component({
  selector: 'app-project-journal',
  templateUrl: './project-journal.component.html',
  styleUrls: ['./project-journal.component.css']
})
export class ProjectJournalComponent implements OnInit, OnDestroy {
  comments: JournalComment[] = [];
  specificProject;
  specificProjectComments: JournalComment[] = [];
  index: number;
  specificProjectsSubs: Subscription;

  constructor(private projectsService: ProjectsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.specificProject = this.projectsService.getProjects();
    this.index = +this.route.snapshot.paramMap.get('id');
    this.specificProjectsSubs = this.projectsService.projectsChanged
    .subscribe((projects: Project[]) => {
      this.specificProject = projects[this.index];
      this.specificProjectComments = this.specificProject.journalComments;
    });
    this.projectsService.fetchProjects();
  }

  onSubmit(form: NgForm) {
    this.projectsService.addJournalComments(form.value, this.index);
    form.reset();
  }

  ngOnDestroy() {
    this.specificProjectsSubs.unsubscribe();
  }

}
