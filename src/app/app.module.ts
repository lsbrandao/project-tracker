import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { MaterialModule } from './material.module';
import { ProjectsComponent } from './projects/projects.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { AuthService } from './auth/auth.service';
import { ProjectsService } from './projects/projects.service';
import { ProjectsTableComponent } from './projects/projects-table/projects-table.component';
import { ProjectsDetailsComponent } from './projects/projects-details/projects-details.component';
import { EditProjectComponent } from './projects/projects-details/edit-project.component';
import { ProjectJournalComponent } from './projects/projects-details/project-journal/project-journal.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ProjectsComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    NewProjectComponent,
    ProjectsTableComponent,
    ProjectsDetailsComponent,
    EditProjectComponent,
    ProjectJournalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthService,
    ProjectsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditProjectComponent]
})
export class AppModule { }
