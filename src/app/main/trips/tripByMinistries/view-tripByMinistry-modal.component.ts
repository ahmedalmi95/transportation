import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetTripByMinistryForView, TripByMinistryDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewTripByMinistryModal',
    templateUrl: './view-tripByMinistry-modal.component.html'
})
export class ViewTripByMinistryModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal',{static: true}) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetTripByMinistryForView;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetTripByMinistryForView();
        this.item.tripByMinistry = new TripByMinistryDto();
    }

    show(item: GetTripByMinistryForView): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
