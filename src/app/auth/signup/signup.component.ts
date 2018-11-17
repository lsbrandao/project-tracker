import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  usernameValue;
  passwordValue;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.signup(this.signupForm.value.username);
  }

}