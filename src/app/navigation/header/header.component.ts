import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() navbarToggle = new EventEmitter<void>();
  isAuth = false;
  isAuthSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthSubscription = this.authService.authChange.subscribe(authState => {
      this.isAuth = authState;
    });
  }

  onnavbarToggle() {
    this.navbarToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.isAuthSubscription.unsubscribe();
  }
}
