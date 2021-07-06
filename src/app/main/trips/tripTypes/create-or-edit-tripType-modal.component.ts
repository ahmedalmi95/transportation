import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { TripTypesServiceProxy, CreateOrEditTripTypeDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditTripTypeModal',
    templateUrl: './create-or-edit-tripType-modal.component.html'
})
export class CreateOrEditTripTypeModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    tripType: CreateOrEditTripTypeDto = new CreateOrEditTripTypeDto();



    constructor(
        injector: Injector,
        private _tripTypesServiceProxy: TripTypesServiceProxy
    ) {
        super(injector);
    }

    show(tripTypeId?: number): void {

        if (!tripTypeId) {
            this.tripType = new CreateOrEditTripTypeDto();
            this.tripType.id = tripTypeId;

            this.active = true;
            this.modal.show();
        } else {
            this._tripTypesServiceProxy.getTripTypeForEdit(tripTypeId).subscribe(result => {
                this.tripType = result.tripType;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
			
            this._tripTypesServiceProxy.createOrEdit(this.tripType)
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
