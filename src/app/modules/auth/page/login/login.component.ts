import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AccountService } from '@core/service/account-service';
import { LoginModel } from './login.model';
import { Router } from '@angular/router';
import { AlertService } from '../../../../shared/_alert';
import { ForgetPasswordModel } from './forgetpassword.model';
import { AuthenticationService } from '@core/service/authenticationService';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: boolean;
  loginForm: FormGroup;
  ForgetPasswordModel : ForgetPasswordModel = new ForgetPasswordModel();
  signInModel: LoginModel = new LoginModel();

  constructor(
    private _accountService : AccountService,
    private router: Router, 
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) {

  
  }


  ngOnInit() { 

  }

  login() {
    this.alertService.clear();
    this._accountService.UserLogin(this.signInModel).subscribe(result => {
      if (result && result.body && result.body.successful) {
        // localStorage.setItem('authenticationToken', result.body.authenticationToken);
        // localStorage.setItem('userName', result.body.UserName);
        this.alertService.success(result.body.message);
        this.authenticationService.loginAndRedirectToHome(result.body);
        // this.authenticationService.saveUser(result.body);
        // this.router.navigate(['/admin/home']);
      }
      else {
        this.alertService.error(result.body.message);
      }


    });
  }

  RecoverAccount(){
    this.alertService.clear();
    this._accountService.RecoverAccount(this.ForgetPasswordModel).subscribe(result =>{
      document.getElementById("closeDialog").click();
      if(result && result.body && result.body.sentPasswordResetLinkToEmail){
        this.alertService.success("Reset Password Email Sent Successfully.");
      }
      else
      {
        this.alertService.error(result.body.message);
      }

 
    });

  }

 

  

}
