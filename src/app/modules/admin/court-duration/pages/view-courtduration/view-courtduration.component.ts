import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourtsDurationService } from '@core/service/courtsDuration-service';
import { SpeekioToastService } from '@shared/service/speekio-toast.service';
import { CustomRouter } from '@shared/service/custom-router.service';
import { ViewDurationSlots } from '@core/model/courtsDuration-model/view-duration-slots.model';
import { BookingService } from '@core/service/booking-service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SlotCancelComponent } from '../../component/slot-cancel/slot-cancel.component';
import { SlotDetailComponent } from '../../component/slot-detail/slot-detail.component';
import { SlotBookingComponent } from '../../component/slot-booking/slot-booking.component';
import { MySlotOwnBookingComponent } from '../../component/my-slot-own-booking/my-slot-own-booking.component';

@Component({
  selector: 'app-view-courtduration',
  templateUrl: './view-courtduration.component.html',
  styleUrls: ['./view-courtduration.component.css']
})
export class ViewCourtdurationComponent implements OnInit {

  constructor(   private courtsDurationService: CourtsDurationService,
    private bookingService : BookingService,
    private toastService: SpeekioToastService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private customRouter: CustomRouter,
    private modalService: NgbModal,
    ) { }

  durationId : number;
  durationSlotsList : ViewDurationSlots[] ;

  ngOnInit() {

    this.durationId = this.activatedRoute.snapshot.params['durationId'];

    this.getDurationList();
  }

  closeResult: string;

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getDurationList(){
    this.courtsDurationService.getDurationSlots(this.durationId).subscribe(result => {
      if (result && result.successful) {
        this.durationSlotsList = result.slotsList;
        if(this.durationSlotsList && this.durationSlotsList.length > 0){

        }
  
      }
      else {
        this.toastService.showError(result.message);
      }
    });
    

  }

  getSlotDetail(slotId:number){
    alert(slotId);

  }


  bookSlot(slotId:number){
    alert(slotId);
  }

 

  cancelSlotDialog(slotId : number){
    const modalRef = this.modalService.open(SlotCancelComponent, { size: 'small', backdrop: 'static' });
    //    modalRef.componentInstance.LoaderService = this.ngxUiLoaderService;
    modalRef.componentInstance.slotId = slotId;
    modalRef.result.then((result: any) => {

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openSlotDialog(slotId : number){
    const modalRef = this.modalService.open(SlotCancelComponent, { size: 'small', backdrop: 'static' });
    modalRef.componentInstance.slotId = slotId;
    modalRef.result.then((result: any) => {

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  
  ownBookingSlotDialog(slotId : number){
    const modalRef = this.modalService.open(MySlotOwnBookingComponent, { size: 'small', backdrop: 'static' });
    //    modalRef.componentInstance.LoaderService = this.ngxUiLoaderService;
    modalRef.componentInstance.slotId = slotId;
    modalRef.result.then((result: any) => {
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  
  detailSlotDialog(slotId : number){
    const modalRef = this.modalService.open(SlotDetailComponent, { size: 'xl', backdrop: 'static' });
    //    modalRef.componentInstance.LoaderService = this.ngxUiLoaderService;
    modalRef.componentInstance.slotId = slotId;
    modalRef.result.then((result: any) => {

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  
  bookingSlotDialog(slotId : number){
    const modalRef = this.modalService.open(SlotBookingComponent, { size: 'xl', backdrop: 'static' });
    //    modalRef.componentInstance.LoaderService = this.ngxUiLoaderService;
    modalRef.componentInstance.slotId = slotId;
    modalRef.result.then((result: any) => {

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}
