import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { ViwTripPlanedDailyServiceProxy, CreateOrEditViwTripPlanedDailyDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditViwTripPlanedDailyModal',
    templateUrl: './create-or-edit-viwTripPlanedDaily-modal.component.html'
})
export class CreateOrEditViwTripPlanedDailyModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    viwTripPlanedDaily: CreateOrEditViwTripPlanedDailyDto = new CreateOrEditViwTripPlanedDailyDto();

            tripMinistryStart_date: Date;
            trpPlanStart_date: Date;
            trpPlanEnd_date: Date;
            workingday: Date;


    constructor(
        injector: Injector,
        private _viwTripPlanedDailyServiceProxy: ViwTripPlanedDailyServiceProxy
    ) {
        super(injector);
    }

    show(viwTripPlanedDailyId?: number): void {
this.tripMinistryStart_date = null;
this.trpPlanStart_date = null;
this.trpPlanEnd_date = null;
this.workingday = null;

        if (!viwTripPlanedDailyId) {
            this.viwTripPlanedDaily = new CreateOrEditViwTripPlanedDailyDto();
            this.viwTripPlanedDaily.id = viwTripPlanedDailyId;

            this.active = true;
            this.modal.show();
        } else {
            this._viwTripPlanedDailyServiceProxy.getViwTripPlanedDailyForEdit(viwTripPlanedDailyId).subscribe(result => {
                this.viwTripPlanedDaily = result.viwTripPlanedDaily;

                if (this.viwTripPlanedDaily.tripMinistryStart_date) {
					this.tripMinistryStart_date = this.viwTripPlanedDaily.tripMinistryStart_date.toDate();
                }
                if (this.viwTripPlanedDaily.trpPlanStart_date) {
					this.trpPlanStart_date = this.viwTripPlanedDaily.trpPlanStart_date.toDate();
                }
                if (this.viwTripPlanedDaily.trpPlanEnd_date) {
					this.trpPlanEnd_date = this.viwTripPlanedDaily.trpPlanEnd_date.toDate();
                }
                if (this.viwTripPlanedDaily.workingday) {
					this.workingday = this.viwTripPlanedDaily.workingday.toDate();
                }

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
			
        if (this.tripMinistryStart_date) {
            if (!this.viwTripPlanedDaily.tripMinistryStart_date) {
                this.viwTripPlanedDaily.tripMinistryStart_date = moment(this.tripMinistryStart_date).startOf('day');
            }
            else {
                this.viwTripPlanedDaily.tripMinistryStart_date = moment(this.tripMinistryStart_date);
            }
        }
        else {
            this.viwTripPlanedDaily.tripMinistryStart_date = null;
        }
        if (this.trpPlanStart_date) {
            if (!this.viwTripPlanedDaily.trpPlanStart_date) {
                this.viwTripPlanedDaily.trpPlanStart_date = moment(this.trpPlanStart_date).startOf('day');
            }
            else {
                this.viwTripPlanedDaily.trpPlanStart_date = moment(this.trpPlanStart_date);
            }
        }
        else {
            this.viwTripPlanedDaily.trpPlanStart_date = null;
        }
        if (this.trpPlanEnd_date) {
            if (!this.viwTripPlanedDaily.trpPlanEnd_date) {
                this.viwTripPlanedDaily.trpPlanEnd_date = moment(this.trpPlanEnd_date).startOf('day');
            }
            else {
                this.viwTripPlanedDaily.trpPlanEnd_date = moment(this.trpPlanEnd_date);
            }
        }
        else {
            this.viwTripPlanedDaily.trpPlanEnd_date = null;
        }
        if (this.workingday) {
            if (!this.viwTripPlanedDaily.workingday) {
                this.viwTripPlanedDaily.workingday = moment(this.workingday).startOf('day');
            }
            else {
                this.viwTripPlanedDaily.workingday = moment(this.workingday);
            }
        }
        else {
            this.viwTripPlanedDaily.workingday = null;
        }
            this._viwTripPlanedDailyServiceProxy.createOrEdit(this.viwTripPlanedDaily)
             .pipe(finalize(() => { this.saving = false; }))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }







    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
