import { Component, OnInit } from '@angular/core';
import { CourtsDurationService } from '@core/service/courtsDuration-service';
import { SpeekioToastService } from '@shared/service/speekio-toast.service';
import { AddCourtsDurationModel } from '@core/model/courtsDuration-model/add-courtsDuration.model';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomRouter } from '@shared/service/custom-router.service';
@Component({
  selector: 'app-create-courtduration',
  templateUrl: './create-courtduration.component.html',
  styleUrls: ['./create-courtduration.component.css']
})
export class CreateCourtdurationComponent implements OnInit {

  constructor(
    private courtsDurationService: CourtsDurationService,
    private toastService: SpeekioToastService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private customRouter: CustomRouter,
    ) { }
    sportsList: any[];
    courtsList: any[];
  addCourtsDuratoinData : AddCourtsDurationModel;
  courtsDurationId : number = 0;
  isUpdated : boolean = false;
  uId: number = +localStorage.getItem('userId');
  companyId: number = +localStorage.getItem('companyId');

  sportsId: number; //to be assigned from dropdown
  ngOnInit() {
    this.addCourtsDuratoinData = new AddCourtsDurationModel();

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
        this.getCourts(this.sportsList[0].id);
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
      this.courtsList = result.courtsList;
      this.addCourtsDuratoinData.courtId = this.courtsList[0].id;

    }
    else {
      this.toastService.showError(result.message);
    }
  });
}
selectCourt(courtId){

  this.addCourtsDuratoinData.courtId = courtId;
}
getCourtsDuration(courtsDurationId:number){
  this.courtsDurationService.getCourtsDuration(courtsDurationId).subscribe(result => {

    if (result && result.successful) {
      this.addCourtsDuratoinData = result;
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
    this.courtsDurationService.addCourtsDuration(this.addCourtsDuratoinData).subscribe(result => {
      debugger;
    if (result && result.body.successful) {
      this.toastService.showSuccess(result.body.message);
      this.customRouter.navigateToSibling(this.router, this.activatedRoute, 'courtduration-list');
    }
    else {
      this.toastService.showError(result.body.message);
    }
  });
  }
}
updateCourtsDuration(){
this.courtsDurationService.updateCourtsDuration(this.addCourtsDuratoinData).subscribe(result =>{
  debugger;
  if(result && result.body.successful) {
    this.toastService.showSuccess(result.body.message);
    this.customRouter.navigateToSibling(this.router, this.activatedRoute, 'courtduration-list');
  }
  else {
    this.toastService.showError(result.body.message);
  }
});
}
}
