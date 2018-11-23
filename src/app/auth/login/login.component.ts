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
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.loginForm.value);
  }

}
