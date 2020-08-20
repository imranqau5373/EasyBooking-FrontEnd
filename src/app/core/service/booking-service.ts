import { Injectable } from '@angular/core';
import { HttpApiService } from '@shared/http-api-service';
import { Observable  } from 'rxjs';
import { CompanyBookingQuery } from '@core/model/booking-model/company-booking-query.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private _httpApiService: HttpApiService
    
    ) { }

    //This is template service. whenever create new service. copy this code and paste it in new service and do changes according to it.

    
    getCompanyBookings(bookingQuery: CompanyBookingQuery):Observable<any>{
      return this._httpApiService.post("Booking/GetCompanyBooking",bookingQuery);
    }

    getUserBookings(bookingQuery: CompanyBookingQuery):Observable<any>{
      return this._httpApiService.post("Booking/GetUserBookingQuery",bookingQuery);
    }

    getUserBookingListPaged(  name: string, bookingDate: any, lastUpdated: any,
      createdBy: string, statusId: string[], sortColumn: any, sortDirection: any,
      pageNumber: any, pageSize: any):Observable<any>{
        const temp = {
          name: name,
          bookingDate: bookingDate ? {
            Date: bookingDate,
            ComparisonType: 3
          } : null,
          createdBy: createdBy,
          statusId: statusId,
          lastUpdated: lastUpdated ? {
            Date: lastUpdated.Date,
            ComparisonType: lastUpdated.CompareType
          } : null,
          sortColumn: sortColumn,
          sortDirection: sortDirection,
          pageNumber: pageNumber,
          pageSize: pageSize,
        };
        return this._httpApiService.post("Booking/GetUserBookings",temp);

      }

    cancelBookingSlot(slotId: Number):Observable<any>{
      let Myobject: any = { "slotId": slotId }
      return this._httpApiService.get("BookingSlots/CancelBookingSlot",Myobject);
    }

    openBookingSlot(slotId: Number):Observable<any>{
      let Myobject: any = { "slotId": slotId }
      return this._httpApiService.get("BookingSlots/OpenBookingSlot",Myobject);
    }

    
    detailBookingSlot(slotId: Number):Observable<any>{
      let Myobject: any = { "slotId": slotId }
      return this._httpApiService.get("BookingSlots/DetailBookingSlot",Myobject);
    }

    
    bookedSlot(slotId: Number):Observable<any>{
      let Myobject: any = { "slotId": slotId }
      return this._httpApiService.get("BookingSlots/BookedSlot",Myobject);
    }


    bookedOwnSlot(slotId: Number):Observable<any>{
      let Myobject: any = { "slotId": slotId }
      return this._httpApiService.get("BookingSlots/BookedSlot",Myobject);
    }





}


