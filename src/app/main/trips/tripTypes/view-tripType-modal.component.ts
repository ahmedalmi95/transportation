import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetTripTypeForView, TripTypeDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewTripTypeModal',
    templateUrl: './view-tripType-modal.component.html'
})
export class ViewTripTypeModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetTripTypeForView;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetTripTypeForView();
        this.item.tripType = new TripTypeDto();
    }

    show(item: GetTripTypeForView): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
