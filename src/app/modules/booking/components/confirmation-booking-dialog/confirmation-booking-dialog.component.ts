import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SpeekioToastService } from '@shared/service/speekio-toast.service';
import { BookingService } from '@core/service/booking-service';
import { LoginBookingDialogComponent } from '../login-booking-dialog/login-booking-dialog.component';
import { SignupBookingDialogComponent } from '../signup-booking-dialog/signup-booking-dialog.component';

@Component({
  selector: 'app-confirmation-booking-dialog',
  templateUrl: './confirmation-booking-dialog.component.html',
  styleUrls: ['./confirmation-booking-dialog.component.css']
})
export class ConfirmationBookingDialogComponent implements OnInit {
  closeResult: string;
  constructor(public activeModal: NgbActiveModal,
    private toastService: SpeekioToastService,
    private modalService: NgbModal,
    private bookingService : BookingService) { }

  ngOnInit() {

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
    this.closeDialog();
    const modalRef = this.modalService.open(LoginBookingDialogComponent, { size: 'small', backdrop: 'static' });
    //    modalRef.componentInstance.LoaderService = this.ngxUiLoaderService;
    modalRef.result.then((result: any) => {

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  signup(){
    this.closeDialog();
    const modalRef = this.modalService.open(SignupBookingDialogComponent, { size: 'small', backdrop: 'static' });
    //    modalRef.componentInstance.LoaderService = this.ngxUiLoaderService;
    modalRef.result.then((result: any) => {

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  

  
  closeDialog(){
    this.activeModal.dismiss();
  }
}
