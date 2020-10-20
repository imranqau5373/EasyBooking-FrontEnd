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
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  closeDialog(){
    this.activeModal.dismiss();
  }

  save(){
    let dateTimeSchedule = new DayTimeScheduleModel;
    dateTimeSchedule.id = this.activatedRoute.snapshot.params['id'];;
    dateTimeSchedule.startTime = this.timePeriodsForm.controls['startTime'].value;
    dateTimeSchedule.endTime = this.timePeriodsForm.controls['endTime'].value;
    this.daytimeService.addDayTimeSchedule(dateTimeSchedule).subscribe(result => {
      if (result.body && result.body.successful)
        this.toastService.showSuccess(result.body.message);
      else
        this.toastService.showError(result.message);
      this.activeModal.dismiss();

    });
  }

}
