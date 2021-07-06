import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { TripPlanedDailyWitHDriversServiceProxy, CreateOrEditTripPlanedDailyWitHDriverDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditTripPlanedDailyWitHDriverModal',
    templateUrl: './create-or-edit-tripPlanedDailyWitHDriver-modal.component.html'
})
export class CreateOrEditTripPlanedDailyWitHDriverModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    tripPlanedDailyWitHDriver: CreateOrEditTripPlanedDailyWitHDriverDto = new CreateOrEditTripPlanedDailyWitHDriverDto();

            workingday: Date;


    constructor(
        injector: Injector,
        private _tripPlanedDailyWitHDriversServiceProxy: TripPlanedDailyWitHDriversServiceProxy
    ) {
        super(injector);
    }

    show(tripPlanedDailyWitHDriverId?: number): void {
this.workingday = null;

        if (!tripPlanedDailyWitHDriverId) {
            this.tripPlanedDailyWitHDriver = new CreateOrEditTripPlanedDailyWitHDriverDto();
            this.tripPlanedDailyWitHDriver.id = tripPlanedDailyWitHDriverId;

            this.active = true;
            this.modal.show();
        } else {
            this._tripPlanedDailyWitHDriversServiceProxy.getTripPlanedDailyWitHDriverForEdit(tripPlanedDailyWitHDriverId).subscribe(result => {
                this.tripPlanedDailyWitHDriver = result.tripPlanedDailyWitHDriver;

                if (this.tripPlanedDailyWitHDriver.workingday) {
					this.workingday = this.tripPlanedDailyWitHDriver.workingday.toDate();
                }

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
			
        if (this.workingday) {
            if (!this.tripPlanedDailyWitHDriver.workingday) {
                this.tripPlanedDailyWitHDriver.workingday = moment(this.workingday).startOf('day');
            }
            else {
                this.tripPlanedDailyWitHDriver.workingday = moment(this.workingday);
            }
        }
        else {
            this.tripPlanedDailyWitHDriver.workingday = null;
        }
            this._tripPlanedDailyWitHDriversServiceProxy.createOrEdit(this.tripPlanedDailyWitHDriver)
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
