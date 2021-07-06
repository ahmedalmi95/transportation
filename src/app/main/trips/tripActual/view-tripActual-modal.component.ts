import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetTripActualForView, TripActualDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewTripActualModal',
    templateUrl: './view-tripActual-modal.component.html'
})
export class ViewTripActualModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetTripActualForView;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetTripActualForView();
        this.item.tripActual = new TripActualDto();
    }

    show(item: GetTripActualForView): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
