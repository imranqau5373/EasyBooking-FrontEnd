import { SearchModelDto, StatusModelDto } from '@shared/service/page-listing-component-base';

export class BookingsListModel {
    id: number;
    Name: string;
    Description: string;
    //CompanyId : number;
    // questionsList: QuestionModel[] = [];
}

export class BookingsListModelPagged {

    BookingList : BookingsListModel[];
}

export class FilterBookingsRequestDto {
    pageNumber: number;
    pageSize: number;

    Id: SearchModelDto = {
        key: 'Sports_Id',
        defaultValue: '',
        value: '',
        isOptionType: false,
        options: null
    };

    Name: SearchModelDto = {
        key: 'Sports_Id',
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