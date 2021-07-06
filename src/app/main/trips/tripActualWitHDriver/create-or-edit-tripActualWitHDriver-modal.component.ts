import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { TripActualWitHDriverServiceProxy, CreateOrEditTripActualWitHDriverDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditTripActualWitHDriverModal',
    templateUrl: './create-or-edit-tripActualWitHDriver-modal.component.html'
})
export class CreateOrEditTripActualWitHDriverModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    tripActualWitHDriver: CreateOrEditTripActualWitHDriverDto = new CreateOrEditTripActualWitHDriverDto();

            tripDate: Date;


    constructor(
        injector: Injector,
        private _tripActualWitHDriverServiceProxy: TripActualWitHDriverServiceProxy
    ) {
        super(injector);
    }

    show(tripActualWitHDriverId?: number): void {
this.tripDate = null;

        if (!tripActualWitHDriverId) {
            this.tripActualWitHDriver = new CreateOrEditTripActualWitHDriverDto();
            this.tripActualWitHDriver.id = tripActualWitHDriverId;

            this.active = true;
            this.modal.show();
        } else {
            this._tripActualWitHDriverServiceProxy.getTripActualWitHDriverForEdit(tripActualWitHDriverId).subscribe(result => {
                this.tripActualWitHDriver = result.tripActualWitHDriver;

                if (this.tripActualWitHDriver.tripDate) {
					this.tripDate = this.tripActualWitHDriver.tripDate.toDate();
                }

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
			
        if (this.tripDate) {
            if (!this.tripActualWitHDriver.tripDate) {
                this.tripActualWitHDriver.tripDate = moment(this.tripDate).startOf('day');
            }
            else {
                this.tripActualWitHDriver.tripDate = moment(this.tripDate);
            }
        }
        else {
            this.tripActualWitHDriver.tripDate = null;
        }
            this._tripActualWitHDriverServiceProxy.createOrEdit(this.tripActualWitHDriver)
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
