import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  projects: Observable<any>;
  projectsSubscription: Subscription;
  openJournal = false;

  constructor(public dialog: MatDialog,
              private router: Router,
              private db: AngularFirestore) { }

  ngOnInit() {
    this.projects = this.db.collection('projects').valueChanges();
  }

  onPanelClose() {
    this.router.navigate(['/projects/projects-list']);
    this.openJournal = false;
  }

  ngOnDestroy(): void {
    this.projectsSubscription.unsubscribe();
  }
}

