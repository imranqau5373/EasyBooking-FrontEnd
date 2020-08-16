import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SpeekioToastService } from '@shared/service/speekio-toast.service';
import { BookingService } from '@core/service/booking-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '@core/service/account-service';
import { AlertService } from '@shared/_alert';
import { LoginModel } from '@modules/auth/page/login/login.model';
import { AuthenticationService } from '@core/service/authenticationService';

@Component({
  selector: 'app-login-booking-dialog',
  templateUrl: './login-booking-dialog.component.html',
  styleUrls: ['./login-booking-dialog.component.css']
})
export class LoginBookingDialogComponent implements OnInit {
  loginForm: FormGroup;
  signInModel: LoginModel = new LoginModel();
  constructor(public activeModal: NgbActiveModal,
    private toastService: SpeekioToastService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private _accountService : AccountService,
    private bookingService : BookingService) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });
  }

  get f(){
    return this.loginForm.controls;
}




  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  login(){
    this.signInModel.email = this.loginForm.controls["email"].value;
    this.signInModel.password = this.loginForm.controls["password"].value;
    this._accountService.UserLogin(this.signInModel).subscribe(result => {
      this.activeModal.dismiss();
      if (result && result.body && result.body.successful) {
        localStorage.setItem('userName', result.body.userName);
        localStorage.setItem('companyId', result.body.companyId);
         localStorage.setItem('userId', result.body.userId);
       this.authenticationService.loginAndRedirectToUrl(result.body,'/booking/list');
     }
     else {
       this.alertService.error(result.body.message);
     }
    });
  }

  
  closeDialog(){
    this.activeModal.dismiss();
  }

}
