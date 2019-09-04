import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public login;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  public submitUser() {
    if (this.login) {
      this.http.post('/user', {user: this.login}).subscribe((item) => {
        sessionStorage.setItem('id', this.login);
        this.router.navigate(['/game']);
      }, err => {
        console.log(err);
      });
    }
  }

}
