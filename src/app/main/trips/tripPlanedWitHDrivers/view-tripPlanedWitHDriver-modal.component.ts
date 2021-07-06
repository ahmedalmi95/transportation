import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetTripPlanedWitHDriverForView, TripPlanedWitHDriverDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewTripPlanedWitHDriverModal',
    templateUrl: './view-tripPlanedWitHDriver-modal.component.html'
})
export class ViewTripPlanedWitHDriverModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetTripPlanedWitHDriverForView;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetTripPlanedWitHDriverForView();
        this.item.tripPlanedWitHDriver = new TripPlanedWitHDriverDto();
    }

    show(item: GetTripPlanedWitHDriverForView): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
