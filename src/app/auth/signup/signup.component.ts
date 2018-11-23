import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  isLoading = false;
  isLoadingSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private uiService: UIService
    ) { }

  ngOnInit() {
    this.isLoadingSub = this.uiService.loadingStateChanged.subscribe(isLoadingState => {
      this.isLoading = isLoadingState;
    });
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService.signup(this.signupForm.value);
  }

  ngOnDestroy() {
    this.isLoadingSub.unsubscribe();
  }

}
