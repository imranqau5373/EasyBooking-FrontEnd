import { Injectable } from '@angular/core';
import { HttpApiService } from '@shared/http-api-service';
import { Observable  } from 'rxjs';
import { GetUserModel } from '@core/model/users-model/get-usersList.model';
import { AddUserModel } from '@core/model/users-model/add-users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _httpApiService: HttpApiService

    ) { }


    Method():Observable<any>{
      return this._httpApiService.get("","");
    }

    getUserList(model: GetUserModel): Observable<any> {
      return this._httpApiService.post("Identity/getUserList", model);
    }

      getUserRoles(): Observable<any> {
        return this._httpApiService.post("Identity/getUserRoles");
      }
//Get Company Name for court duration


      addUser(model: AddUserModel):Observable<any>{
        return this._httpApiService.post("Identity/SignUp",model);
      }

      
      addNewUser(model: AddUserModel): Observable<any> {
        return this._httpApiService.post("Identity/AddUser", model);
      }
      addGuesUser(model: AddUserModel): Observable<any> {
        return this._httpApiService.post("Identity/AddGuestUser", model);
      }


      getSportsCompany():Observable<any>{
        return this._httpApiService.get("Sports/GetSportsCompanies",'');
      }

      updateUser(model: AddUserModel):Observable<any>{
        return this._httpApiService.post("Profile/UpdateProfile",model);
      }

      getUser(id: number):Observable<any>{
        let Myobject: any = { "id": id }
        return this._httpApiService.get("Profile/GetProfile",Myobject);
      }

}
