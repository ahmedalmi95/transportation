import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { StationsServiceProxy, CreateOrEditStationDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditStationModal',
    templateUrl: './create-or-edit-station-modal.component.html'
})
export class CreateOrEditStationModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    station: CreateOrEditStationDto = new CreateOrEditStationDto();



    constructor(
        injector: Injector,
        private _stationsServiceProxy: StationsServiceProxy
    ) {
        super(injector);
    }

    show(stationId?: number): void {

        if (!stationId) {
            this.station = new CreateOrEditStationDto();
            this.station.id = stationId;

            this.active = true;
            this.modal.show();
        } else {
            this._stationsServiceProxy.getStationForEdit(stationId).subscribe(result => {
                this.station = result.station;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
			
            this._stationsServiceProxy.createOrEdit(this.station)
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
