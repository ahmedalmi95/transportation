import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { ViwTripPlanedServiceProxy, CreateOrEditViwTripPlanedDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditViwTripPlanedModal',
    templateUrl: './create-or-edit-viwTripPlaned-modal.component.html'
})
export class CreateOrEditViwTripPlanedModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    viwTripPlaned: CreateOrEditViwTripPlanedDto = new CreateOrEditViwTripPlanedDto();

            tripMinistryStart_date: Date;
            trpPlanStart_date: Date;
            trpPlanEnd_date: Date;


    constructor(
        injector: Injector,
        private _viwTripPlanedServiceProxy: ViwTripPlanedServiceProxy
    ) {
        super(injector);
    }

    show(viwTripPlanedId?: number): void {
this.tripMinistryStart_date = null;
this.trpPlanStart_date = null;
this.trpPlanEnd_date = null;

        if (!viwTripPlanedId) {
            this.viwTripPlaned = new CreateOrEditViwTripPlanedDto();
            this.viwTripPlaned.id = viwTripPlanedId;

            this.active = true;
            this.modal.show();
        } else {
            this._viwTripPlanedServiceProxy.getViwTripPlanedForEdit(viwTripPlanedId).subscribe(result => {
                this.viwTripPlaned = result.viwTripPlaned;

                if (this.viwTripPlaned.tripMinistryStart_date) {
					this.tripMinistryStart_date = this.viwTripPlaned.tripMinistryStart_date.toDate();
                }
                if (this.viwTripPlaned.trpPlanStart_date) {
					this.trpPlanStart_date = this.viwTripPlaned.trpPlanStart_date.toDate();
                }
                if (this.viwTripPlaned.trpPlanEnd_date) {
					this.trpPlanEnd_date = this.viwTripPlaned.trpPlanEnd_date.toDate();
                }

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
			
        if (this.tripMinistryStart_date) {
            if (!this.viwTripPlaned.tripMinistryStart_date) {
                this.viwTripPlaned.tripMinistryStart_date = moment(this.tripMinistryStart_date).startOf('day');
            }
            else {
                this.viwTripPlaned.tripMinistryStart_date = moment(this.tripMinistryStart_date);
            }
        }
        else {
            this.viwTripPlaned.tripMinistryStart_date = null;
        }
        if (this.trpPlanStart_date) {
            if (!this.viwTripPlaned.trpPlanStart_date) {
                this.viwTripPlaned.trpPlanStart_date = moment(this.trpPlanStart_date).startOf('day');
            }
            else {
                this.viwTripPlaned.trpPlanStart_date = moment(this.trpPlanStart_date);
            }
        }
        else {
            this.viwTripPlaned.trpPlanStart_date = null;
        }
        if (this.trpPlanEnd_date) {
            if (!this.viwTripPlaned.trpPlanEnd_date) {
                this.viwTripPlaned.trpPlanEnd_date = moment(this.trpPlanEnd_date).startOf('day');
            }
            else {
                this.viwTripPlaned.trpPlanEnd_date = moment(this.trpPlanEnd_date);
            }
        }
        else {
            this.viwTripPlaned.trpPlanEnd_date = null;
        }
            this._viwTripPlanedServiceProxy.createOrEdit(this.viwTripPlaned)
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
