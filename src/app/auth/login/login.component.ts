import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, MinLengthValidator } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });
  usernameValue;
  passwordValue;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.username,
      password: this.loginForm.value.password
    });
    console.log(this.authService.getUser());
  }

}
