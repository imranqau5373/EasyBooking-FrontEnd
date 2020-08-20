import { Component, OnInit } from '@angular/core';
import { CourtsBookingListModelPagged, FilterBookingListRequestDto } from '@core/model/courtsBooking-model/CourtsBookingListModelPagged';
import { PagedListingComponentBase } from '@shared/service/page-listing-component-base';
import { PagingModel } from '@core/model/common/paging.model';
import { Subject } from 'rxjs';
import { CustomRouter } from '@shared/service/custom-router.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { CourtsBookingService } from '@core/service/courtsBooking-service';
import { SpeekioToastService } from '@shared/service/speekio-toast.service';
import { AuthenticationService } from '@core/service/authenticationService';
import { UserBookingModel } from '@core/model/booking-model/user-booking.model';
import { finalize } from 'rxjs/operators';
import { BookingService } from '@core/service/booking-service';
import { UserBookingsListModelPagged, FilterUserBookingsRequestDto } from '@core/model/booking-model/UserBookingListModelPagged';

@Component({
  selector: 'app-my-bookings-list',
  templateUrl: './my-bookings-list.component.html',
  styleUrls: ['./my-bookings-list.component.css']
})
export class MyBookingsListComponent extends PagedListingComponentBase<UserBookingsListModelPagged> implements OnInit {


  paggingModel: PagingModel = new PagingModel();
  userBookingList: UserBookingsListModelPagged = new UserBookingsListModelPagged();
  userBookingModel: UserBookingModel;
  destroy$: Subject<boolean> = new Subject<boolean>();
  bookingDate : Date;
  bookingCompanies : null;
  companyId : number;
closeResult: string;
  public filter: FilterUserBookingsRequestDto = new FilterUserBookingsRequestDto();
  constructor(
    private bookingService: BookingService,
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
      this.bookingService.getUserBookingListPaged(this.filter.Name.value, this.filter.AddedQuestions.value,
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
          if (response.items) {
            this.userBookingList.BookingList = response.items;
            this.paggerConfig.totalItems = response.totalCount;
          }

        });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
