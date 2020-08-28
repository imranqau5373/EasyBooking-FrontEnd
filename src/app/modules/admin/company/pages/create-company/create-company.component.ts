import { Component, OnInit } from '@angular/core';
import { CompanyService } from '@core/service/company-service';
import { SpeekioToastService } from '@shared/service/speekio-toast.service';
import { AddCompanyModel } from '@core/model/company-model/add-company.model';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomRouter } from '@shared/service/custom-router.service';
@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  constructor(
    private companyService: CompanyService,
    private toastService: SpeekioToastService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private customRouter: CustomRouter,
  ) { }
  addCompanyData : AddCompanyModel;
  companyId : number = 0;
  isUpdated : boolean = false;

  ngOnInit() {
    this.addCompanyData = new AddCompanyModel();
    this.companyId = this.activatedRoute.snapshot.params['id'];
    if(this.companyId > 0){
      this.isUpdated = true;
      this.getCompany(this.companyId);
  }
}
getCompany(companyId:number){
  this.companyService.getCompany(companyId).subscribe(result => {

    if (result && result.successful) {
      this.addCompanyData = result;
    }
    else {
      this.toastService.showError(result.message);
    }
  });
}
updateCompany(){
this.companyService.updateCompany(this.addCompanyData).subscribe(result =>{
  if(result && result.body.successful) {
    this.toastService.showSuccess(result.body.message);
    this.customRouter.navigateToSibling(this.router, this.activatedRoute, 'company-list');
  }
  else {
    this.toastService.showError(result.message);
  }
});
}
}
