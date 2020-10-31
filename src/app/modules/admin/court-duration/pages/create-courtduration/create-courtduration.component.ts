import { Component, OnInit } from '@angular/core';
import { CourtsDurationService } from '@core/service/courtsDuration-service';
import { SpeekioToastService } from '@shared/service/speekio-toast.service';
import { AddCourtsDurationModel } from '@core/model/courtsDuration-model/add-courtsDuration.model';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomRouter } from '@shared/service/custom-router.service';
import { DayTimeService } from '@core/service/daytime-service';
@Component({
  selector: 'app-create-courtduration',
  templateUrl: './create-courtduration.component.html',
  styleUrls: ['./create-courtduration.component.css']
})
export class CreateCourtdurationComponent implements OnInit {

  constructor(
    private courtsDurationService: CourtsDurationService,
    private dayTimeZoneService: DayTimeService,
    private toastService: SpeekioToastService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private customRouter: CustomRouter,
    ) { }
    sportsList: any[];
    courtsList: any[];
    dayTimeZonesList: any[];
  addCourtsDuratoinData : AddCourtsDurationModel;
  courtsDurationId : number = 0;
  isUpdated : boolean = false;
  uId: number = +localStorage.getItem('userId');
  companyId: number = 0;
  dayTimeZoneId: number = 0;
  

  sportsId: number; //to be assigned from dropdown
  courtId: number; //to be assigned from dropdown
  
  ngOnInit() {

    this.addCourtsDuratoinData = new AddCourtsDurationModel();
    this.companyId = +localStorage.getItem('companyId');
    this.getDayTimeZones();
    //  this.addCourtsDuratoinData.userId = this.uId;
    this.courtsDurationId = this.activatedRoute.snapshot.params['id'];
      this.getSports(this.companyId);
    if(this.courtsDurationId > 0){
      this.isUpdated = true;
      this.getCourtsDuration(this.courtsDurationId);

  }
}

getSports(companyId:number){   //get list of sports for cmp

  this.courtsDurationService.getSports(companyId).subscribe(result => {
    if (result && result.successful) {
      this.sportsList = result.sportsList;
      if(this.sportsList && this.sportsList.length > 0){
        //this.getCourts(this.sportsList[0].id);
      }

    }
    else {
      this.toastService.showError(result.message);
    }
  });
}
getCourts(sportId:number){   //get list of courts for cmp in selected sports
  this.courtsDurationService.getCourts(sportId).subscribe(result => {
    if (result && result.successful) {
      if(result.courtsList.length > 0){
        this.courtsList = result.courtsList;
        this.addCourtsDuratoinData.courtId = this.courtsList[0].id;
      }
      else{
        this.toastService.showError('No facility found against this category. please select another category or add facility agaist this category.');
      }


    }
    else {
      this.toastService.showError(result.message);
    }
  });
}

getDayTimeZones(){   //get list of courts for cmp in selected sports
  this.dayTimeZoneService.getDayTimeZones().subscribe(result => {
    if (result && result.successful) {
      if(result.dayTimeZonesList.length > 0){
        this.dayTimeZonesList = result.dayTimeZonesList;
        this.addCourtsDuratoinData.dayTimeZoneId = this.dayTimeZonesList[0].id;
      }
      else{
        this.toastService.showError('No daytime zone found. please add a new daytimezones.');
      }


    }
    else {
      this.toastService.showError(result.message);
    }
  });
}

selectCourt(courtId){
  this.addCourtsDuratoinData.courtId = courtId;
}

selectDayTimeZone(dayTimeZoneId){
  this.addCourtsDuratoinData.dayTimeZoneId = dayTimeZoneId;
}
getCourtsDuration(courtsDurationId:number){
  this.courtsDurationService.getCourtsDuration(courtsDurationId).subscribe(result => {

    if (result && result.successful) {
      this.addCourtsDuratoinData = result;
      //var ab  = result.courtStartTime.toLocaleTimeString('it-IT');
      //console.log(ab.toLocaleTimeString('it-IT'))
    //  this.sportsId = result.sportId;
    //  this.getCourts(this.companyId,result.sportId);
    }
    else {
      this.toastService.showError(result.message);
    }
  });
}
addCourtsDuration(){
if(this.isUpdated == true)
this.updateCourtsDuration();
else{
  this.addCourtsDuratoinData.durationStatusId = 1;
    this.courtsDurationService.addCourtsDuration(this.addCourtsDuratoinData).subscribe(result => {
    if (result && result.body.successful) {
      this.toastService.showSuccess(result.body.message);
      this.customRouter.navigateToSibling(this.router, this.activatedRoute, 'duration-list');
    }
    else {
      this.toastService.showError(result.message);
    }
  });
  }
}
updateCourtsDuration(){
this.courtsDurationService.updateCourtsDuration(this.addCourtsDuratoinData).subscribe(result =>{
  if(result && result.body.successful) {
    this.toastService.showSuccess(result.body.message);
    this.customRouter.navigateToSibling(this.router, this.activatedRoute, 'facilitiesduration-list');
  }
  else {
    this.toastService.showError(result.message);
  }
});
}
}
