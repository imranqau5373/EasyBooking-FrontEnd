import { Component, OnInit } from '@angular/core';
import { AddCompanyModel } from '@core/model/company-model/add-company.model';
import { CompanyService } from '@core/service/company-service';
import { SpeekioToastService } from '@shared/service/speekio-toast.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  companyId : string;
  addCompanyData : AddCompanyModel;
  constructor(   private companyService: CompanyService,
    private toastService: SpeekioToastService) { }

  ngOnInit() {
    this.companyId = localStorage.getItem('companyId');
    this.getCompanyDetails();
  }

  getCompanyDetails(){
    this.companyService.getCompany(+this.companyId).subscribe(result => {

      if (result && result.successful) {
        this.addCompanyData = result;
      }
      else {
        this.toastService.showError(result.message);
      }
    });
  }

  updateCompanyDetails(){
    
  }

}
