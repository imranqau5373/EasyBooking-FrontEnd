import { SearchModelDto, StatusModelDto } from '@shared/service/page-listing-component-base';

export class CourtBookingModel {
  id: number;
  v: string;
  description: string;
  courtName: string;
  userName: string;
  courtId : number;  //Show name instead
  userId : number;  // ----
  bookingStartTime : Date;
  bookingEndTime : Date;
  isBooked: boolean;
  isEmailed: boolean;
  //add sports id too
}

export class CourtsBookingListModelPagged {

    CourtBooking : CourtBookingModel[];
}

export class FilterBookingListRequestDto {
  pageNumber: number;
  pageSize: number;

  Id: SearchModelDto = {
      key: 'Id',
      defaultValue: '',
      value: '',
      isOptionType: false,
      options: null
  };

  CompanyId: SearchModelDto = {
      key: 'CompanyId',
      defaultValue: '',
      value: '',
      isOptionType: false,
      options: null
  };

  BookingDate: SearchModelDto = {
      key: 'BookingDate',
      defaultValue: null,
      value: null,
      isOptionType: false,
      options: null
  };

  LastUpdated: SearchModelDto = {
      key: 'Category_LastUpdated',
      defaultValue: '',
      value: '',
      isOptionType: false,
      options: null
  };

  CreatedBy: SearchModelDto = {
      key: 'Category_CreatedBy',
      defaultValue: '',
      value: '',
      isOptionType: false,
      options: null
  };

  IsBooked: SearchModelDto = {
      key: 'IsBooked',
      defaultValue: '',
      value: '',
      isOptionType: false,
      options: null
    }
  };
