import { Injectable } from '@angular/core';
import { HttpApiService } from '@shared/http-api-service';
import { Observable  } from 'rxjs';
import { GetCourtsBookingModel } from '@core/model/courtsBooking-model/get-courtsBookingList.model';
import { AddCourtsBookingModel } from '@core/model/courtsBooking-model/add-courtsBooking.model';
import { UserBookingModel } from '@core/model/booking-model/user-booking.model';
import { CommonService } from '@shared/service/common.service';



@Injectable({
  providedIn: 'root'
})
export class CourtsBookingService {

  constructor(
    private _httpApiService: HttpApiService,
    private commonService: CommonService
    ) { }


    Method():Observable<any>{
      return this._httpApiService.get("","");
    }

    getCourtsBookingList( BookingDate: any):Observable<any>{
      const temp = {
        BookingDate: BookingDate ? {
          Date: this.commonService.prepareDateFormat(BookingDate),
          ComparisonType: BookingDate.CompareType
        } : null,

      };
        return this._httpApiService.post("CourtsBooking/GetCourtsBookingsList",temp);

      }

      getCourtsBookingListPaged(  CompanyId: number, bookingDate: any, lastUpdated: any,
        createdBy: string, isBooked: boolean, sortColumn: any, sortDirection: any,
        pageNumber: any, pageSize: any):Observable<any>{
          const temp = {
            CompanyId: CompanyId,
            bookingDate: bookingDate ? {
              Date: bookingDate,
              ComparisonType: 3
            } : null,
            createdBy: createdBy,
            IsBooked: isBooked,
            lastUpdated: lastUpdated ? {
              Date: this.commonService.prepareDateFormat(lastUpdated.Date),
              ComparisonType: lastUpdated.CompareType
            } : null,
            sortColumn: sortColumn,
            sortDirection: sortDirection,
            pageNumber: pageNumber,
            pageSize: pageSize,
          };
          return this._httpApiService.post("CourtsBooking/GetCourtsBookingsList",temp);
  
        }
      saveBookingUser(model: UserBookingModel):Observable<any>{

        return this._httpApiService.post("CourtsBooking/GetCourtsBookingsList",model);

      }
      //Get list of courts in cmpany in sports
      getCourt(companyId:number,sportsId:number):Observable<any>{
        let Myobject: any = {
           "companyId": companyId,
           "sportsId":sportsId   }
        return this._httpApiService.get("Courts/GetCourtsByCompanySportsId",Myobject);
      }
      //Get Sports for currnt cmpany
      getSports(companyId: number):Observable<any>{
          let Myobject: any = { "companyId": companyId }
        return this._httpApiService.get("Sports/GetSportsByCompanyId",Myobject);
      }
      addCourtsBooking(model: AddCourtsBookingModel):Observable<any>{
        return this._httpApiService.post("CourtsBooking/AddCourtsBooking",model);
      }


      updateCourtsBooking(model: AddCourtsBookingModel):Observable<any>{
        return this._httpApiService.post("CourtsBooking/UpdateCourtsBooking",model);
      }

      getCourtsBooking(id: number):Observable<any>{
        let Myobject: any = { "id": id }
        return this._httpApiService.get("CourtsBooking/GetCourtsBookings",Myobject);
      }

      getBookingCompanies():Observable<any>{
        return this._httpApiService.get("CourtsBooking/GetBookingCompanies",'');
      }

}
