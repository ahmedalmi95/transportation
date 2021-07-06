import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetBusInfoForView, BusInfoDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewBusInfoModal',
    templateUrl: './view-busInfo-modal.component.html'
})
export class ViewBusInfoModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetBusInfoForView;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetBusInfoForView();
        this.item.busInfo = new BusInfoDto();
    }

    show(item: GetBusInfoForView): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
