import { Injectable } from '@angular/core';
import { DayTimeModel, DayTimeScheduleModel } from '@core/model/daytime-model/DayTimeListModelPagged';
import { HttpApiService } from '@shared/http-api-service';
import { CommonService } from '@shared/service/common.service';
import { Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DayTimeService {

  constructor(
    private _httpApiService: HttpApiService,
    private commonService: CommonService
    ) { }

    Method():Observable<any>{
      return this._httpApiService.get("","");
    }

    getDayTimeZoneList( name: string, lastUpdated: any,
        createdBy: string, sortColumn: any, sortDirection: any,
        pageNumber: any, pageSize: any):Observable<any>{
          const temp = {
            name: name,
            createdBy: createdBy,
            lastUpdated: lastUpdated ? {
              Date: this.commonService.prepareDateFormat(lastUpdated.Date),
              ComparisonType: lastUpdated.CompareType
            } : null,
            sortColumn: sortColumn,
            sortDirection: sortDirection,
            pageNumber: pageNumber,
            pageSize: pageSize,
          };
          return this._httpApiService.post("DayTimeSchedule/GetDayTimeScheduleList",temp);
        }

        addDayTimeZone(model: DayTimeModel):Observable<any>{
            return this._httpApiService.post("DayTimeSchedule/AddDayTimeSchedule",model);
          }

          updateDayTimeZone(model: DayTimeModel):Observable<any>{
            return this._httpApiService.post("DayTimeSchedule/UpdateDayTimeSchedule",model);
          }
          getDayTimeZone(id: number):Observable<any>{
            let Myobject: any = { "id": id }
            return this._httpApiService.get("DayTimeSchedule/GetDayTimeSchedule",Myobject);
          }

          addDayTimeSchedule(model: DayTimeScheduleModel):Observable<any>{
            return this._httpApiService.post("DayTimeSchedule/AddDayTimeSchedule",model);
          }





}


