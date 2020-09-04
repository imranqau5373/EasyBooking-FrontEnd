import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HttpApiService } from '@shared/http-api-service';
import { UserVerificationModel } from '@core/model/users-model/user-verification.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private _httpApiService: HttpApiService
    
    ) { }
    
    getPackagesList(): Observable<any> {
      return this._httpApiService.post("Identity/getPackageList");
    }

    UserLogin(signInModel):Observable<any>{
      return this._httpApiService.post("Identity/SignIn",signInModel);
    }

    verifyUser(model: UserVerificationModel): Observable<any> {
      return this._httpApiService.post("Identity/Activate", model);
    }

    UserLogOff():Observable<any>{
      return this._httpApiService.get("Identity/SignOut",'');
    }

    RecoverAccount(emailAddress):Observable<any>{
      return this._httpApiService.post("Identity/ForgetPasswordStepOne",emailAddress);
    }

    ResetPassword(resetPasswordModel):Observable<any>{
      return this._httpApiService.post("Identity/ForgetPasswordStepTwo",resetPasswordModel);
    }

    ValidateTokenAndEmail(resetPasswordModel):Observable<any>{
      return this._httpApiService.post("Identity/ForgetPasswordStepTwo",resetPasswordModel);
    }

    UserSignUp(singUpModel){
    return this._httpApiService.post("Identity/SignUp",singUpModel);
    }

    // SearchCompanyUrl(strCompanyUrl) {
    //   const myObject: any = { strCompanyUrl: 'strCompanyUrl'};
    //   return this._httpApiService.get("/Identity/SearchCompanyUrl", new HttpParams(myObject));
    // }
    SearchCompanyUrl(strCompanyUrl) {
      let Myobject:any={"strCompanyUrl":strCompanyUrl}
      return this._httpApiService.get("Identity/SearchCompanyUrl",Myobject);
    }

}


