import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SpeekioToastService } from '@shared/service/speekio-toast.service';
import { BookingService } from '@core/service/booking-service';
import { BookingSlotModel } from '@core/model/courtsBooking-model/booking-slot.model';

@Component({
  selector: 'app-slot-detail',
  templateUrl: './slot-detail.component.html',
  styleUrls: ['./slot-detail.component.css']
})
export class SlotDetailComponent implements OnInit {

  @Input() slotId : Number = 0;
  slotDetail : any;
  constructor(   public activeModal: NgbActiveModal,
    private toastService: SpeekioToastService,
    private bookingService : BookingService) { }

  ngOnInit() {
    this.detailSlot();
  }

  closeDialog(){
    this.activeModal.dismiss();
  }

      
  detailSlot(){
    this.bookingService.detailBookingSlot(this.slotId).subscribe(result => {
      if (result && result.successful) {
        this.slotDetail = result
      }
      else {
        this.toastService.showError(result.message);
        this.activeModal.dismiss();
      }
    });
  }


}
