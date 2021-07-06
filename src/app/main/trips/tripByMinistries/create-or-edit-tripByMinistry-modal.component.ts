import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { TripByMinistriesServiceProxy, CreateOrEditTripByMinistryDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { RouteLookupTableModalComponent } from './route-lookup-table-modal.component';
import { CalenderBusLookupTableModalComponent } from './calenderBus-lookup-table-modal.component';


@Component({
    selector: 'createOrEditTripByMinistryModal',
    templateUrl: './create-or-edit-tripByMinistry-modal.component.html'
})
export class CreateOrEditTripByMinistryModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal',{static: true}) modal: ModalDirective;
    @ViewChild('routeLookupTableModal',{static: true}) routeLookupTableModal: RouteLookupTableModalComponent;
    @ViewChild('calenderBusLookupTableModal',{static: true}) calenderBusLookupTableModal: CalenderBusLookupTableModalComponent;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    tripByMinistry: CreateOrEditTripByMinistryDto = new CreateOrEditTripByMinistryDto();

    routeLineNumber = '';
    calenderBusTenantId = '';


    constructor(
        injector: Injector,
        private _tripByMinistriesServiceProxy: TripByMinistriesServiceProxy
    ) {
        super(injector);
    }

    show(tripByMinistryId?: number): void {

        if (!tripByMinistryId) {
            this.tripByMinistry = new CreateOrEditTripByMinistryDto();
            this.tripByMinistry.id = tripByMinistryId;
            this.tripByMinistry.timeSpan = moment().startOf('day');
            this.tripByMinistry.timeSpanEnd = moment().startOf('day');
            this.routeLineNumber = '';
            this.calenderBusTenantId = '';

            this.active = true;
            this.modal.show();
        } else {
            this._tripByMinistriesServiceProxy.getTripByMinistryForEdit(tripByMinistryId).subscribe(result => {
                this.tripByMinistry = result.tripByMinistry;

                this.routeLineNumber = result.routeLineNumber;
                this.calenderBusTenantId = result.calenderBusTenantId;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
			
            this._tripByMinistriesServiceProxy.createOrEdit(this.tripByMinistry)
             .pipe(finalize(() => { this.saving = false; }))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }

        openSelectRouteModal() {
        this.routeLookupTableModal.id = this.tripByMinistry.routeId;
        this.routeLookupTableModal.displayName = this.routeLineNumber;
        this.routeLookupTableModal.show();
    }
        openSelectCalenderBusModal() {
        this.calenderBusLookupTableModal.id = this.tripByMinistry.calenderBusId;
        this.calenderBusLookupTableModal.displayName = this.calenderBusTenantId;
        this.calenderBusLookupTableModal.show();
    }


        setRouteIdNull() {
        this.tripByMinistry.routeId = null;
        this.routeLineNumber = '';
    }
        setCalenderBusIdNull() {
        this.tripByMinistry.calenderBusId = null;
        this.calenderBusTenantId = '';
    }


        getNewRouteId() {
        this.tripByMinistry.routeId = this.routeLookupTableModal.id;
        this.routeLineNumber = this.routeLookupTableModal.displayName;
    }
        getNewCalenderBusId() {
        this.tripByMinistry.calenderBusId = this.calenderBusLookupTableModal.id;
        this.calenderBusTenantId = this.calenderBusLookupTableModal.displayName;
    }


    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
