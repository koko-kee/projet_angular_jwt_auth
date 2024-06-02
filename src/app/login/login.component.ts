import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../chat-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  message: string = '';
  processConnexion: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: ChatService, private router: Router) {}

  login() {
    this.processConnexion = true;
    this.authService.login(this.loginForm.value).subscribe((response) => {
      if (response.status === 'success') {
        this.processConnexion = false;
        localStorage.setItem('token', response.access_token);
        this.router.navigate(['/chat']);
      } else {
        this.message = 'Email ou mot de passe incorret';
        this.processConnexion = false;
      }
    });
  }
}
