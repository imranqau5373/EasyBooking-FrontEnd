import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '@shared/_alert';
import { CourtsBookingService } from '@core/service/courtsBooking-service';
import { SpeekioToastService } from '@shared/service/speekio-toast.service';
import { CustomRouter } from '@shared/service/custom-router.service';
import { PagingModel } from '@core/model/common/paging.model';
import { CourtsBookingListModelPagged, FilterBookingListRequestDto } from '@core/model/courtsBooking-model/CourtsBookingListModelPagged';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PagedListingComponentBase } from '@shared/service/page-listing-component-base';
import { UserBookingModel } from '@core/model/booking-model/user-booking.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BookingDialogComponent } from '@modules/booking/components/booking-dialog/booking-dialog.component';
import { AuthenticationService } from '@core/service/authenticationService';
import { RegistrationBookingDialogComponent } from '@modules/booking/components/registration-booking-dialog/registration-booking-dialog.component';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent extends PagedListingComponentBase<CourtsBookingListModelPagged> implements OnInit {


  paggingModel: PagingModel = new PagingModel();
  courtsBookingList: CourtsBookingListModelPagged = new CourtsBookingListModelPagged();
  userBookingModel: UserBookingModel;
  destroy$: Subject<boolean> = new Subject<boolean>();
  bookingDate : Date;
  bookingCompanies : null;
  companyId : number;
  closeResult: string;
  public filter: FilterBookingListRequestDto = new FilterBookingListRequestDto();
  constructor(
    private courtsBookingService: CourtsBookingService,
    private toastService: SpeekioToastService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private customRouter: CustomRouter,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
  ) {

    super();
   }

  ngOnInit() {
    this.userBookingModel = new UserBookingModel();
    let currentPage = this.customRouter.getQueryParamByKey(this.activatedRoute, 'page');
    if (currentPage) {
      this.paggerConfig.currentPage = currentPage;
    }
    super.ngOnInit();
    this.getBookingCompanies();
  }

  pageChange(newPage: number) {

    this.paggerConfig.currentPage = newPage;
    this.customRouter.navigateToSibling(this.router, this.activatedRoute, 'list', { page: newPage });
    this.refresh();
  }


  changePageSize(pageSize: number) {

    this.paggerConfig.itemsPerPage = pageSize;
    this.customRouter.navigateToSibling(this.router, this.activatedRoute, 'list', { itemsPerPage: pageSize });
    this.refresh();
  }


  protected list(
    request: PagingModel,
    finishedCallback: Function) {
      this.courtsBookingService.getCourtsBookingListPaged(this.filter.Name.value, this.filter.AddedQuestions.value,
        this.filter.LastUpdated.value, this.filter.CreatedBy.value, this.filter.StatusId.value,
        this.sorting, this.sortDirection ? 'ASC' : 'DESC', request.currentPage, request.itemsPerPage)
        .pipe(
          finalize(() => {
            finishedCallback();
          })
        )
        .subscribe(result => {
          if (!result || !result.body) {
            return;
          };
          var response = result.body;
          this.paggerConfig.totalItems = result.body.totalCount;
          if (!response.successful) {
            this.toastService.showError(response.message);
            return;
          }
          if (response.items && response.items.length > 0) {
            this.courtsBookingList.CourtBooking = response.items;
            this.paggerConfig.totalItems = response.totalCount;
          }

        });
  }

  saveUserBooking(form: any){

  }

  openBookingDialog(isbooked : boolean,slotId : number){
    if(isbooked){
      return false;
    }
    if(this.authenticationService.isUserLoggedIn()){
      this.openLoggedInUser(slotId);
    }
    else{
      this.openBookingRegistration();
    }

  }

  private openLoggedInUser(slotId : number){
    const modalRef = this.modalService.open(BookingDialogComponent, { size: 'small', backdrop: 'static' });
    modalRef.componentInstance.slotId = slotId;
    //    modalRef.componentInstance.LoaderService = this.ngxUiLoaderService;
    modalRef.result.then((result: any) => {

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private openBookingRegistration(){
    const modalRef = this.modalService.open(RegistrationBookingDialogComponent, { size: 'small', backdrop: 'static' });
    //    modalRef.componentInstance.LoaderService = this.ngxUiLoaderService;
    modalRef.result.then((result: any) => {

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  applyFilter(){
    console.log(this.bookingDate);
    //this.refresh();
  }

  getBookingCompanies(){
    this.courtsBookingService.getBookingCompanies().subscribe(result => {
      if (result && result.successful) {
        this.bookingCompanies = result.bookingCompanyList
      }
      else {
        this.toastService.showError(result.message);
      }
    });
  }

  setCompanyId(event : any){
    this.companyId = event.target.value;
    alert(this.companyId);
  }

}
