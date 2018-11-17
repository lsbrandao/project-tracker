import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectJournalComponent } from './project-journal.component';

describe('ProjectJournalComponent', () => {
  let component: ProjectJournalComponent;
  let fixture: ComponentFixture<ProjectJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectJournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
