import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FacebookService, InitParams, LoginResponse} from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user = null;
  foo = "";

  constructor(private fb: FacebookService, private http: HttpClient) {

    let initParams: InitParams = {
      appId: '1625551617477516',
      cookie: true,
      xfbml: false,
      status: true,
      version: 'v2.8'
    };

    fb.init(initParams);

    this.http.get('/login/')
      .subscribe(data => {
        if (data) {
          this.user = data;
        }
      });
  }

  public facebookLogin(): void {
    this.fb.login({scope: 'public_profile,email'})
      .then((response: LoginResponse) => {
        if (response.status == 'connected') {
          this.http.post('/login/facebook', {access_token: response.authResponse.accessToken})
            .subscribe(data => {
              //console.log(data);
              this.user = data;
            });
        }
      })
      .catch((error: any) => console.error(error));
  }
}
