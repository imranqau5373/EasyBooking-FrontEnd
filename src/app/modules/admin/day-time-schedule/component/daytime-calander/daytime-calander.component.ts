import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DayTimeZoneElement, TimePeriodElement } from '@core/model/daytime-model/day-time-zone';
import { DayTimeService } from '@core/service/daytime-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpeekioToastService } from '@shared/service/speekio-toast.service';
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
  styleUrls: ['./daytime-calander.component.scss']
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
  constructor(private modalService: NgbModal,
    private daytimeService: DayTimeService,
    private toastService: SpeekioToastService,
    private cd: ChangeDetectorRef,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getDayTimeZone();
  }

  getDayTimeZone(){
    let dayTimeZoneId = this.activatedRoute.snapshot.params['id'];
    this.daytimeService.getTimeSchedule(dayTimeZoneId).subscribe(result => {
      if (result && result.successful)
      {
        this.dayTimeZone.dayTimeZoneSchedules = result.timeScheduleReponse;
      }
      else
        this.toastService.showError(result.message);

    });
  }

  openDialog(day: number): void {
    let id = this.activatedRoute.snapshot.params['id'];
    var timSchedule : any;
    timSchedule = this.dayTimeZone.dayTimeZoneSchedules ? this.dayTimeZone.dayTimeZoneSchedules[day] : null;
    const modalRef = this.modalService.open(WeekdayDialogComponent, { size: 'small', backdrop: 'static' });
    modalRef.componentInstance.data = { startTime: timSchedule ? timSchedule.startTime : null, endTime:timSchedule ? timSchedule.endTime : null,day:day,id:id };
    modalRef.componentInstance.scheduleData = this.dayTimeZone.dayTimeZoneSchedules[day];
    modalRef.result.then((result: any) => {
      timSchedule = {};
      timSchedule.startTime= result.startTime;
      timSchedule.endTime= result.endTime;
      this.dayTimeZone.dayTimeZoneSchedules[day] = timSchedule;
  
    }, (reason) => {
      this.closeResult = '';
    });
  }

  public isTimePeriod(day: number, hour: string): string {
    const weekDay = this.getWeekDay(day);
    const week = this.dayTimeZone.dayTimeZoneSchedules ? this.dayTimeZone.dayTimeZoneSchedules[day] : null;

    if (week && this.isHourInTimePeriod(hour, week)) {

      return 'day-time-schedule__time-period';
    }
    return '';
  }

  
  public isHourInTimePeriod(hour: string, timePeriods: any): boolean {
    const result = false;
    if (timePeriods) {
      var period = timePeriods;
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

    return result;
  }

  public getWeekDay(day: number): string {
    const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    return weekdays[day];
  }



}
