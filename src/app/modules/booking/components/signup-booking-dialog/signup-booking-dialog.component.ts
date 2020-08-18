import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SpeekioToastService } from '@shared/service/speekio-toast.service';
import { BookingService } from '@core/service/booking-service';
import { UserBookingModel } from '@core/model/booking-model/user-booking.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '@shared/_helper/must-match.validator';
import { RegisterModel } from '@modules/auth/page/register/register.model';
import { AccountService } from '@core/service/account-service';
import { Router } from '@angular/router';
import { AlertService } from '@shared/_alert';
import { AddUserModel, GetUserRoleModel } from '@core/model/users-model/add-users.model';
import { UsersService } from '@core/service/user-service';

@Component({
  selector: 'app-signup-booking-dialog',
  templateUrl: './signup-booking-dialog.component.html',
  styleUrls: ['./signup-booking-dialog.component.css']
})
export class SignupBookingDialogComponent implements OnInit {
  userBookingModel: RegisterModel; 
  userModel : AddUserModel;
  signupVerificationForm: FormGroup;
  roles: GetUserRoleModel[];
  constructor(public activeModal: NgbActiveModal,
    private toastService: SpeekioToastService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private _accountService : AccountService,
    private router: Router, 
    private alertService: AlertService,
    private usersService: UsersService,
    private speekioToastService: SpeekioToastService,
    private bookingService : BookingService) { }

  ngOnInit() {
    this.userBookingModel = new RegisterModel();
    this.userModel = new AddUserModel();
    this.roles = [];
    this.getUserRoles();
    this.initializeForm();
  }

  initializeForm() {
    this.signupVerificationForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  get f(){
    return this.signupVerificationForm.controls;
}

saveUser() {
  this.userModel.email = this.signupVerificationForm.controls["email"].value;
  this.usersService.addGuesUser(this.userModel).subscribe(result => {
    let response = result.body;
    if (!response || !response.successful) {
      this.speekioToastService.showError(response.message);
      return;
    }
    this.speekioToastService.showSuccess(response.message);
      this.activeModal.dismiss();
  });
  }

  getUserRoles() {

    this.usersService.getUserRoles().subscribe(result => {
      let response = result.body;
      if (!response || !response.successful) {
        this.speekioToastService.showError(response.message);
      }
      this.roles = response.userRolesList;
      this.userModel.selectedRoles.push(this.roles.find(x => x.name == "Booking User"));
      console.log(this.userModel);
    });
  }

  signUp(){
    this.userBookingModel.firstName = this.signupVerificationForm.controls["firstName"].value;
    this.userBookingModel.lastName = this.signupVerificationForm.controls["lastName"].value;
    this.userBookingModel.email = this.signupVerificationForm.controls["email"].value;
    this.userBookingModel.password = this.signupVerificationForm.controls["password"].value;
    this.userBookingModel.phone = this.signupVerificationForm.controls["phone"].value;
    // this._accountService.UserSignUp(this.userBookingModel).subscribe({
    //   next: result =>{
    //     if(result && result.body && result.body.successful){
    //       this.activeModal.dismiss();
    //       console.log(result.body.successful);
    //       this.alertService.success("You are successfully registered. Please login on it.")
    //   }
    //   else
    //   {
    //     if(result.body.isAlreadyRegistered)
    //     this.handleError('This email is already registerd.');
    //     else
    //     this.handleError(result.body.message);
    //   }
    //   },
    //   error: this.handleError.bind(this)
    // });
    
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

  handleError(error)
{
  this.alertService.error(error);
}


  
  closeDialog(){
    this.activeModal.dismiss();
  }

  saveUserBooking(form: any){

  }

}
