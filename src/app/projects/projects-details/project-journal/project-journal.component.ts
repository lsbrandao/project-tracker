import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { JournalComment } from './journal-comment.model';
import { ProjectsService } from '../../projects.service';

@Component({
  selector: 'app-project-journal',
  templateUrl: './project-journal.component.html',
  styleUrls: ['./project-journal.component.css']
})
export class ProjectJournalComponent implements OnInit {
  comments: JournalComment[] = [];
  specificProject;
  specificProjectComments: JournalComment[] = [];
  @Input() index: number;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    const projects = this.projectsService.getProjects();
    this.specificProject = projects[this.index];
    this.specificProjectComments = this.specificProject.journalComments;
    this.projectsService.journalCommentsChanged.subscribe(comments => {
      this.specificProjectComments = comments;
    });
  }

  onSubmit(form: NgForm) {
    this.projectsService.addJournalComments(form.value, this.index);
    form.reset();
  }

}
