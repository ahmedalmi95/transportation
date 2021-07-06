import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetViwTripPlanedDailyForView, ViwTripPlanedDailyDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewViwTripPlanedDailyModal',
    templateUrl: './view-viwTripPlanedDaily-modal.component.html'
})
export class ViewViwTripPlanedDailyModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetViwTripPlanedDailyForView;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetViwTripPlanedDailyForView();
        this.item.viwTripPlanedDaily = new ViwTripPlanedDailyDto();
    }

    show(item: GetViwTripPlanedDailyForView): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
