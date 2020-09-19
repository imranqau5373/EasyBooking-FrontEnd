import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagingModel } from '@core/model/common/paging.model';
import { FilterCourtDurationRequestDto } from '@core/model/courtsDuration-model/CourtsDurationListModelPagged';
import { DayTimeListModelPagged } from '@core/model/daytime-model/DayTimeListModelPagged';
import { CourtsDurationService } from '@core/service/courtsDuration-service';
import { DayTimeService } from '@core/service/daytime-service';
import { CustomRouter } from '@shared/service/custom-router.service';
import { PagedListingComponentBase } from '@shared/service/page-listing-component-base';
import { SpeekioToastService } from '@shared/service/speekio-toast.service';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list-daytime',
  templateUrl: './list-daytime.component.html',
  styleUrls: ['./list-daytime.component.css']
})
export class ListDaytimeComponent extends PagedListingComponentBase<DayTimeListModelPagged> implements OnInit {

  paggingModel: PagingModel = new PagingModel();
  dayTimeZoneList: DayTimeListModelPagged = new DayTimeListModelPagged();
public filter: FilterCourtDurationRequestDto = new FilterCourtDurationRequestDto();
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private dayTimeService: DayTimeService,
    private toastService: SpeekioToastService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private customRouter: CustomRouter
  ) {
    super();
  }

  ngOnInit() {
    let currentPage = this.customRouter.getQueryParamByKey(this.activatedRoute, 'page');
    if (currentPage) {
      this.paggerConfig.currentPage = currentPage;
    }
    super.ngOnInit();
  }

  pageChange(newPage: number) {

    this.paggerConfig.currentPage = newPage;
    this.customRouter.navigateToSibling(this.router, this.activatedRoute, 'facilitiesduration-list', { page: newPage });
    this.refresh();
  }
  changePageSize(pageSize: number) {

    this.paggerConfig.itemsPerPage = pageSize;
    this.customRouter.navigateToSibling(this.router, this.activatedRoute, 'facilitiesduration-list', { itemsPerPage: pageSize });
    this.refresh();
  }

  protected list(
    request: PagingModel,
    finishedCallback: Function) {
      this.dayTimeService.getDayTimeZoneList(this.filter.Name.value,
        this.filter.LastUpdated.value, this.filter.CreatedBy.value,
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
            this.dayTimeZoneList.daytimezone = response.items;
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
