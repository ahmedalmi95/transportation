import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { TripActualRoutes_StationServiceProxy, CreateOrEditTripActualRoutes_StationDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditTripActualRoutes_StationModal',
    templateUrl: './create-or-edit-tripActualRoutes_Station-modal.component.html'
})
export class CreateOrEditTripActualRoutes_StationModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    tripActualRoutes_Station: CreateOrEditTripActualRoutes_StationDto = new CreateOrEditTripActualRoutes_StationDto();



    constructor(
        injector: Injector,
        private _tripActualRoutes_StationServiceProxy: TripActualRoutes_StationServiceProxy
    ) {
        super(injector);
    }

    show(tripActualRoutes_StationId?: number): void {

        if (!tripActualRoutes_StationId) {
            this.tripActualRoutes_Station = new CreateOrEditTripActualRoutes_StationDto();
            this.tripActualRoutes_Station.id = tripActualRoutes_StationId;

            this.active = true;
            this.modal.show();
        } else {
            this._tripActualRoutes_StationServiceProxy.getTripActualRoutes_StationForEdit(tripActualRoutes_StationId).subscribe(result => {
                this.tripActualRoutes_Station = result.tripActualRoutes_Station;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
			
            this._tripActualRoutes_StationServiceProxy.createOrEdit(this.tripActualRoutes_Station)
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
