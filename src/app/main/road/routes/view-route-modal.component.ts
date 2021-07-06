import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetRouteForView, RouteDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewRouteModal',
    templateUrl: './view-route-modal.component.html',
    styles: [
        `
            h6 {
                display: inline-block;
                line-height: 25px;
            }
        `,
    ],
})
export class ViewRouteModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetRouteForView;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetRouteForView();
        this.item.route = new RouteDto();
    }

    show(item: GetRouteForView): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
