import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DayTimeScheduleModel } from '@core/model/daytime-model/DayTimeListModelPagged';
import { DayTimeService } from '@core/service/daytime-service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SpeekioToastService } from '@shared/service/speekio-toast.service';

@Component({
  selector: 'app-weekday-dialog',
  templateUrl: './weekday-dialog.component.html',
  styleUrls: ['./weekday-dialog.component.css']
})
export class WeekdayDialogComponent implements OnInit {
  public errors = [];
  public timePeriodsForm: FormGroup;
  public isValid;
  public zeroTimeValue = '00:00';
  @Input() data: any;

  @Input() scheduleData : any;

  constructor( 
    private daytimeService: DayTimeService,
    private toastService: SpeekioToastService,
    public activeModal: NgbActiveModal,
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit( ) {
    this.generateForm();
  }

  generateForm(): void {
    this.timePeriodsForm = this.fb.group({
      startTime: [this.data.startTime? this.data.startTime : '', Validators.required],
      endTime: [this.data.endTime? this.data.endTime : '', Validators.required]
    });
  }

  closeDialog(){
    this.activeModal.dismiss();
  }

  save(){
    let dateTimeSchedule = new DayTimeScheduleModel;
    dateTimeSchedule.DayTimeScheduleId = this.data.id;
    dateTimeSchedule.startTime = this.timePeriodsForm.controls['startTime'].value;
    dateTimeSchedule.endTime = this.timePeriodsForm.controls['endTime'].value;
    dateTimeSchedule.day = parseInt(this.data.day);
    this.daytimeService.addTimeSchedule(dateTimeSchedule).subscribe(result => {
      if (result.body && result.body.successful)
      {
        this.toastService.showSuccess(result.body.message);
        result.body.startTime = dateTimeSchedule.startTime;
        result.body.endTime = dateTimeSchedule.endTime;
      }

      else
        this.toastService.showError(result.message);
      this.activeModal.close(result.body);

    });
  }

}
