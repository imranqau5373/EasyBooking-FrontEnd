import { SearchModelDto, StatusModelDto } from '@shared/service/page-listing-component-base';

export class DayTimeModel {
  id: number;
  name: string;
  description: string;
  lastUpdated: Date;
  companyName:string;
  companyId : string;

}

export class DayTimeListModelPagged {

    daytimezone : DayTimeModel[];
}
export class FilterDayTimeRequestDto {
    pageNumber: number;
    pageSize: number;

    Id: SearchModelDto = {
        key: 'CourtDuration_Id',
        defaultValue: '',
        value: '',
        isOptionType: false,
        options: null
    };
    Name: SearchModelDto = {
        key: 'CourtDuration_Id',
        defaultValue: '',
        value: '',
        isOptionType: false,
        options: null
    };
    AddedQuestions: SearchModelDto = {
        key: 'Category_AddedQuestions',
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

    StatusId: SearchModelDto = {
        key: 'Category_Status',
        defaultValue: '',
        value: '',
        isOptionType: false,
        options: [
            new StatusModelDto(1, 'Draft'),
            new StatusModelDto(2, 'Published'),
        ]
    };

    //DynamicFilter: SearchModelDto[] = [];
}
