import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DayTimeZoneElement, TimePeriodElement } from '@core/model/daytime-model/day-time-zone';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { WeekdayDialogComponent } from '../weekday-dialog/weekday-dialog.component';


enum weekdayNames {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday'
}

@Component({
  selector: 'app-daytime-calander',
  templateUrl: './daytime-calander.component.html',
  styleUrls: ['./daytime-calander.component.css']
})
export class DaytimeCalanderComponent implements OnInit {


  public loading = true;
  public acs = [];
  public weekdayHours = new Array(24);
  public dayTimeZone: DayTimeZoneElement = {};
  public dayTimeZoneForm: FormGroup;
  public isButtonLoading = false;
  public title: string;
  private formType = 'existing';
  public isNew: boolean;
  private subscription: Subscription;
  closeResult: string;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openDialog(day: number): void {
    const theDay = Object.keys(weekdayNames)[Number(day)];
    const week = this.dayTimeZone.dayTimeZoneSchedules ? this.dayTimeZone.dayTimeZoneSchedules[theDay] : null;

    const modalRef = this.modalService.open(WeekdayDialogComponent, { size: 'small', backdrop: 'static' });
    modalRef.componentInstance.data = { startTime: null, endTime:null };
    modalRef.result.then((result: any) => {

    }, (reason) => {
      this.closeResult = '';
    });
  }

  public isTimePeriod(day: number, hour: string): string {
    const weekDay = this.getWeekDay(day);
    const week = this.dayTimeZone.dayTimeZoneSchedules ? this.dayTimeZone.dayTimeZoneSchedules[weekDay] : null;

    if (week && this.isHourInTimePeriod(hour, week)) {

      return 'day-time-schedule__time-period';
    }
    return '';
  }

  
  public isHourInTimePeriod(hour: string, timePeriods: Array<TimePeriodElement>): boolean {
    const result = false;
    if (timePeriods) {
      for (const period of timePeriods) {
        const start = Number(period.startTime.split(':')[0]);
        const end = Number(period.endTime.split(':')[0]);
        const endMint = Number(period.endTime.split(':')[1]);
        if (Number(hour) >= start && end === 0 && endMint === 0) {
          return true;
        }

        if (Number(hour) >= start && Number(hour) < end) {
          return true;
        }

      }
    }

    return result;
  }

  public getWeekDay(day: number): string {
    const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    return weekdays[day];
  }



}
