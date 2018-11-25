import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ProjectsService } from '../../../projects.service';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { JournalComment } from './journal-comment.model';

@Component({
  selector: 'app-project-journal',
  templateUrl: './project-journal.component.html',
  styleUrls: ['./project-journal.component.css']
})
export class ProjectJournalComponent implements OnInit, OnDestroy {
  index: number;
  selectedId: string;
  selectedProject;
  selectedProjectComments: JournalComment[];
  selectedProjectsSubs: Subscription;

  constructor(private projectsService: ProjectsService,
              private route: ActivatedRoute,
              private db: AngularFirestore) {
                this.selectedProject = this.db.doc('projects/' + this.selectedId).valueChanges();
              }

  ngOnInit() {
    this.index = +this.route.snapshot.paramMap.get('index');
    this.selectedId = this.route.snapshot.paramMap.get('id');
    this.selectedProjectsSubs = this.projectsService.projectsChanged.subscribe(projects => {
      this.selectedProject = projects[this.index];
      this.selectedProjectComments = this.selectedProject.journalComments;
    });
    this.projectsService.fetchProjects();
  }

  onSubmit(form: NgForm) {
    this.projectsService.updateJournalComments(form.value, this.selectedProject.id);
    form.reset();
  }

  ngOnDestroy() {
    this.selectedProjectsSubs.unsubscribe();
  }

}
