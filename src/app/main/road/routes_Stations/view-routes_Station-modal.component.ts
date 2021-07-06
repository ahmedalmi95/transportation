import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetRoutes_StationForView, Routes_StationDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewRoutes_StationModal',
    templateUrl: './view-routes_Station-modal.component.html'
})
export class ViewRoutes_StationModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetRoutes_StationForView;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetRoutes_StationForView();
        this.item.routes_Station = new Routes_StationDto();
    }

    show(item: GetRoutes_StationForView): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
