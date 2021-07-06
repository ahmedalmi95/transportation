import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { Routes_StationsServiceProxy, CreateOrEditRoutes_StationDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditRoutes_StationModal',
    templateUrl: './create-or-edit-routes_Station-modal.component.html'
})
export class CreateOrEditRoutes_StationModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    routes_Station: CreateOrEditRoutes_StationDto = new CreateOrEditRoutes_StationDto();



    constructor(
        injector: Injector,
        private _routes_StationsServiceProxy: Routes_StationsServiceProxy
    ) {
        super(injector);
    }

    show(routes_StationId?: number): void {

        if (!routes_StationId) {
            this.routes_Station = new CreateOrEditRoutes_StationDto();
            this.routes_Station.id = routes_StationId;

            this.active = true;
            this.modal.show();
        } else {
            this._routes_StationsServiceProxy.getRoutes_StationForEdit(routes_StationId).subscribe(result => {
                this.routes_Station = result.routes_Station;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
			
            this._routes_StationsServiceProxy.createOrEdit(this.routes_Station)
             .pipe(finalize(() => { this.saving = false; }))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }







    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
