import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { TripPlanedWitHDriversServiceProxy, CreateOrEditTripPlanedWitHDriverDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditTripPlanedWitHDriverModal',
    templateUrl: './create-or-edit-tripPlanedWitHDriver-modal.component.html'
})
export class CreateOrEditTripPlanedWitHDriverModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    tripPlanedWitHDriver: CreateOrEditTripPlanedWitHDriverDto = new CreateOrEditTripPlanedWitHDriverDto();



    constructor(
        injector: Injector,
        private _tripPlanedWitHDriversServiceProxy: TripPlanedWitHDriversServiceProxy
    ) {
        super(injector);
    }

    show(tripPlanedWitHDriverId?: number): void {

        if (!tripPlanedWitHDriverId) {
            this.tripPlanedWitHDriver = new CreateOrEditTripPlanedWitHDriverDto();
            this.tripPlanedWitHDriver.id = tripPlanedWitHDriverId;

            this.active = true;
            this.modal.show();
        } else {
            this._tripPlanedWitHDriversServiceProxy.getTripPlanedWitHDriverForEdit(tripPlanedWitHDriverId).subscribe(result => {
                this.tripPlanedWitHDriver = result.tripPlanedWitHDriver;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
			
            this._tripPlanedWitHDriversServiceProxy.createOrEdit(this.tripPlanedWitHDriver)
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
