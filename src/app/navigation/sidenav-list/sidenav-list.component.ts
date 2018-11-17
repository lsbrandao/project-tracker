import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavClosing = new EventEmitter<void>();
  isAuth = false;
  isAuthSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onSidenavClose() {
    this.sidenavClosing.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onSidenavClose();
  }

  ngOnDestroy() {
    this.isAuthSubscription.unsubscribe();
  }

}
