import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  sideHovered = false;
  cardHovered = false;

  constructor(private readonly router: Router) {}

  onSideEnter() {
    this.sideHovered = false;
    this.cardHovered = false;
  }

  onSideLeave() {
    this.sideHovered = false;
  }

  onCardEnter() {
    this.cardHovered = false;
    this.sideHovered = false;
  }

  onCardLeave() {
    this.cardHovered = false;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/');
  }
}
