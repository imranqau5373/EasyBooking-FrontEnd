import { TimeZoneModel } from './../../../../core/model/timezone-model';
import { GetPacakgesModel } from './../../../../core/model/packages-model/get-packageList.model';
import { Component, OnInit, NgModule } from '@angular/core';
import { AccountService } from '@core/service/account-service';
import { RegisterModel } from './register.model';
import { Router } from '@angular/router';
import { AlertService } from '../../../../shared/_alert';
import {Observable, of, Subject} from 'rxjs';
import { SpeekioToastService } from '@shared/service/speekio-toast.service';
import {debounceTime, delay, distinctUntilChanged,map, flatMap, switchMap, tap} from 'rxjs/operators';
import { TimeZoneService } from '@core/service/other/timeZone-service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpModel: RegisterModel = new RegisterModel();
  isValidUrl : boolean; 
  private delayTimer : any[];
  name:string;
  timezones:TimeZoneModel[];
  packages:any [] ;
  //= [new GetPacakgesModel(1,"Trial"),new GetPacakgesModel(2,"Paid"),new GetPacakgesModel(3,"Premium")];
  private searchTerms = new Subject<string>();
  constructor(
    private _accountService : AccountService,
    private toastService: SpeekioToastService,
    private router: Router, 
    private alertService: AlertService,
    private _timeZoneService:TimeZoneService

  ) {

   this.timezones=  _timeZoneService.getTimeZones();
   //this.packages[] = _accountService.getPackagesList();
    const subscription = this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((term: string) => this._accountService.SearchCompanyUrl(term))
  ).subscribe({
    next: result =>{
      if(result &&  result.successful){
        console.log(result.successful);
        this.isValidUrl=true;
    }
    else
    {
      this.isValidUrl=false;
    }
    },
    error: error=> { 
      
      this.isValidUrl=false;
       console.log(error);
      }
  });
}

  ngOnInit() {
    this.signUpModel.timezone='';
    this.signUpModel.packageId='';    
    this.getPackages();
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  
  getPackages(){
    this._accountService.getPackagesList().subscribe(result => {    
      if (result.body.successful) {
        this.packages = result.body.packageList;
      }
      else {
        this.toastService.showError(result.message);
      }
     });
    }
  SignUp(){
    this.alertService.clear();
    this._accountService.UserSignUp(this.signUpModel).subscribe({
        next: result =>{
          if(result && result.body && result.body.successful){
            console.log(result.body.successful);
            this.router.navigate(['/auth/login']);
        }
        else
        {
          if(result.body.isAlreadyRegistered)
          this.handleError('This email is already registerd.');
          else
          this.handleError(result.body.message);
        }
        },
        error: this.handleError.bind(this)
      });
  }

handleError(error)
{
  this.alertService.error(error);
}


}