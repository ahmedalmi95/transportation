import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetTripActualWitHDriverForView, TripActualWitHDriverDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewTripActualWitHDriverModal',
    templateUrl: './view-tripActualWitHDriver-modal.component.html'
})
export class ViewTripActualWitHDriverModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetTripActualWitHDriverForView;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetTripActualWitHDriverForView();
        this.item.tripActualWitHDriver = new TripActualWitHDriverDto();
    }

    show(item: GetTripActualWitHDriverForView): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
