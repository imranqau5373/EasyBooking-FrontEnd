import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';


@Pipe({ name: 'DefaultDateFormat' })
export class DefaultDateFormatPipe implements PipeTransform {

    //transform the input string to specific date format (used throughout the application)
    transform(date: number): string {
        var datePipe = new DatePipe('en-US');
        return datePipe.transform(date, 'dd-MM-yyyy');
    }

}
