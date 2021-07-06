import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetViwTripPlanedForView, ViwTripPlanedDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewViwTripPlanedModal',
    templateUrl: './view-viwTripPlaned-modal.component.html'
})
export class ViewViwTripPlanedModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetViwTripPlanedForView;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetViwTripPlanedForView();
        this.item.viwTripPlaned = new ViwTripPlanedDto();
    }

    show(item: GetViwTripPlanedForView): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
