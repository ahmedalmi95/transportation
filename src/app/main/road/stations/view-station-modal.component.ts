import {
    Component,
    ViewChild,
    Injector,
    Output,
    EventEmitter,
} from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import {
    GetStationForView,
    StationDto,
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/common/app-component-base";

@Component({
    selector: "viewStationModal",
    templateUrl: "./view-station-modal.component.html",
    styles: [
        `
            h6 {
                display: inline-block;
                line-height: 25px;
            }
        `,
    ],
})
export class ViewStationModalComponent extends AppComponentBase {
    @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetStationForView;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetStationForView();
        this.item.station = new StationDto();
    }

    show(item: GetStationForView): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
