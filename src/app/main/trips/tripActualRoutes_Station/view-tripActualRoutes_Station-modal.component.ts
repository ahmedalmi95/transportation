import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetTripActualRoutes_StationForView, TripActualRoutes_StationDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewTripActualRoutes_StationModal',
    templateUrl: './view-tripActualRoutes_Station-modal.component.html'
})
export class ViewTripActualRoutes_StationModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetTripActualRoutes_StationForView;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetTripActualRoutes_StationForView();
        this.item.tripActualRoutes_Station = new TripActualRoutes_StationDto();
    }

    show(item: GetTripActualRoutes_StationForView): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
