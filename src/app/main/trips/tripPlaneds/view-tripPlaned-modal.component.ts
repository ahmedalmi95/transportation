import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetTripPlanedForView, TripPlanedDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewTripPlanedModal',
    templateUrl: './view-tripPlaned-modal.component.html'
})
export class ViewTripPlanedModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetTripPlanedForView;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetTripPlanedForView();
        this.item.tripPlaned = new TripPlanedDto();
    }

    show(item: GetTripPlanedForView): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
