import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { TripPlanedsServiceProxy, CreateOrEditTripPlanedDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { TripTypeLookupTableModalComponent } from './tripType-lookup-table-modal.component';


@Component({
    selector: 'createOrEditTripPlanedModal',
    templateUrl: './create-or-edit-tripPlaned-modal.component.html'
})
export class CreateOrEditTripPlanedModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;
    @ViewChild('tripTypeLookupTableModal', {static: true}) tripTypeLookupTableModal: TripTypeLookupTableModalComponent;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    tripPlaned: CreateOrEditTripPlanedDto = new CreateOrEditTripPlanedDto();

    tripTypeName = '';


    constructor(
        injector: Injector,
        private _tripPlanedsServiceProxy: TripPlanedsServiceProxy
    ) {
        super(injector);
    }

    show(tripPlanedId?: number): void {

        if (!tripPlanedId) {
            this.tripPlaned = new CreateOrEditTripPlanedDto();
            this.tripPlaned.id = tripPlanedId;
            this.tripTypeName = '';

            this.active = true;
            this.modal.show();
        } else {
            this._tripPlanedsServiceProxy.getTripPlanedForEdit(tripPlanedId).subscribe(result => {
                this.tripPlaned = result.tripPlaned;

                this.tripTypeName = result.tripTypeName;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
			
            this._tripPlanedsServiceProxy.createOrEdit(this.tripPlaned)
             .pipe(finalize(() => { this.saving = false; }))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }

        openSelectTripTypeModal() {
        this.tripTypeLookupTableModal.id = this.tripPlaned.tripTypeId;
        this.tripTypeLookupTableModal.displayName = this.tripTypeName;
        this.tripTypeLookupTableModal.show();
    }


        setTripTypeIdNull() {
        this.tripPlaned.tripTypeId = null;
        this.tripTypeName = '';
    }


        getNewTripTypeId() {
        this.tripPlaned.tripTypeId = this.tripTypeLookupTableModal.id;
        this.tripTypeName = this.tripTypeLookupTableModal.displayName;
    }


    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
