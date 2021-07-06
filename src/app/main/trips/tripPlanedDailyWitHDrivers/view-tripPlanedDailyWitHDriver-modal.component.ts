import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetTripPlanedDailyWitHDriverForView, TripPlanedDailyWitHDriverDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewTripPlanedDailyWitHDriverModal',
    templateUrl: './view-tripPlanedDailyWitHDriver-modal.component.html'
})
export class ViewTripPlanedDailyWitHDriverModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetTripPlanedDailyWitHDriverForView;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetTripPlanedDailyWitHDriverForView();
        this.item.tripPlanedDailyWitHDriver = new TripPlanedDailyWitHDriverDto();
    }

    show(item: GetTripPlanedDailyWitHDriverForView): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
