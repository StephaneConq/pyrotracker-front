import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.doGoogleLogin().then(res => {
      if (res) {
        console.log('res', res);
        this.router.navigate(['']);
      }
    })
  }

}
