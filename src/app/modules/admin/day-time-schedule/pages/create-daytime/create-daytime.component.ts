import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DayTimeModel } from '@core/model/daytime-model/DayTimeListModelPagged';
import { DayTimeService } from '@core/service/daytime-service';
import { CustomRouter } from '@shared/service/custom-router.service';
import { SpeekioToastService } from '@shared/service/speekio-toast.service';

@Component({
  selector: 'app-create-daytime',
  templateUrl: './create-daytime.component.html',
  styleUrls: ['./create-daytime.component.css']
})
export class CreateDaytimeComponent implements OnInit {

  constructor(private daytimeService: DayTimeService,
    private toastService: SpeekioToastService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private customRouter: CustomRouter,) { }

    addDayTimeData : DayTimeModel;
    dayTimeZoneId : number = 0;
    isUpdated : boolean = false;
  companyId: number = +localStorage.getItem('companyId');

  ngOnInit() {
    this.addDayTimeData = new DayTimeModel();
    this.dayTimeZoneId = this.activatedRoute.snapshot.params['id'];
    if(this.dayTimeZoneId > 0){
      this.isUpdated = true;
      this.getDayTimeZone(this.dayTimeZoneId);
    }
  }

  addDayTimeZone(){
    if(this.isUpdated == true)
    this.updateDayTimeZone();
    else{
    this.daytimeService.addDayTimeZone(this.addDayTimeData).subscribe(result => {
      if (result.body && result.body.successful) {
        this.toastService.showSuccess(result.body.message);
        this.customRouter.navigateToSibling(this.router, this.activatedRoute, 'daytime-list');

      }
      else {
        this.toastService.showError(result.message);
      }
    });
  }
}
  getDayTimeZone(daytimeZoneId:number){
    this.daytimeService.getDayTimeZone(daytimeZoneId).subscribe(result => {
      if (result && result.successful) {
        this.addDayTimeData = result;
      }
      else {
        this.toastService.showError(result.message);
      }
    });
  }

  updateDayTimeZone(){
    this.daytimeService.updateDayTimeZone(this.addDayTimeData).subscribe(result => {
      if (result.body && result.body.successful) {
        this.toastService.showSuccess(result.body.message);
        this.customRouter.navigateToSibling(this.router, this.activatedRoute, 'daytime-list');

      }
      else {
        this.toastService.showError(result.message);
      }
    });
  }

}
