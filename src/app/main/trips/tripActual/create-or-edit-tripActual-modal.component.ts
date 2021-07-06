import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { TripActualServiceProxy, CreateOrEditTripActualDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { RouteLookupTableModalComponent } from './route-lookup-table-modal.component';
import { CalenderBusLookupTableModalComponent } from './calenderBus-lookup-table-modal.component';
import { TripPlanedLookupTableModalComponent } from './tripPlaned-lookup-table-modal.component';
import { TripByMinistryLookupTableModalComponent } from './tripByMinistry-lookup-table-modal.component';


@Component({
    selector: 'createOrEditTripActualModal',
    templateUrl: './create-or-edit-tripActual-modal.component.html'
})
export class CreateOrEditTripActualModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;
    @ViewChild('routeLookupTableModal', {static: true}) routeLookupTableModal: RouteLookupTableModalComponent;
    @ViewChild('calenderBusLookupTableModal', {static: true}) calenderBusLookupTableModal: CalenderBusLookupTableModalComponent;
    @ViewChild('tripPlanedLookupTableModal', {static: true}) tripPlanedLookupTableModal: TripPlanedLookupTableModalComponent;
    @ViewChild('tripByMinistryLookupTableModal', {static: true}) tripByMinistryLookupTableModal: TripByMinistryLookupTableModalComponent;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    tripActual: CreateOrEditTripActualDto = new CreateOrEditTripActualDto();

            tripDate: Date;
    routeLineNumber = '';
    calenderBusTenantId = '';
    tripPlanedTenantId = '';
    tripByMinistryTenantId = '';


    constructor(
        injector: Injector,
        private _tripActualServiceProxy: TripActualServiceProxy
    ) {
        super(injector);
    }

    show(tripActualId?: number): void {
this.tripDate = null;

        if (!tripActualId) {
            this.tripActual = new CreateOrEditTripActualDto();
            this.tripActual.id = tripActualId;
            this.routeLineNumber = '';
            this.calenderBusTenantId = '';
            this.tripPlanedTenantId = '';
            this.tripByMinistryTenantId = '';

            this.active = true;
            this.modal.show();
        } else {
            this._tripActualServiceProxy.getTripActualForEdit(tripActualId).subscribe(result => {
                this.tripActual = result.tripActual;

                if (this.tripActual.tripDate) {
					this.tripDate = this.tripActual.tripDate.toDate();
                }
                this.routeLineNumber = result.routeLineNumber;
                this.calenderBusTenantId = result.calenderBusTenantId;
                this.tripPlanedTenantId = result.tripPlanedTenantId;
                this.tripByMinistryTenantId = result.tripByMinistryTenantId;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
			
        if (this.tripDate) {
            if (!this.tripActual.tripDate) {
                this.tripActual.tripDate = moment(this.tripDate).startOf('day');
            }
            else {
                this.tripActual.tripDate = moment(this.tripDate);
            }
        }
        else {
            this.tripActual.tripDate = null;
        }
            this._tripActualServiceProxy.createOrEdit(this.tripActual)
             .pipe(finalize(() => { this.saving = false; }))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }

        openSelectRouteModal() {
        this.routeLookupTableModal.id = this.tripActual.routeId;
        this.routeLookupTableModal.displayName = this.routeLineNumber;
        this.routeLookupTableModal.show();
    }
        openSelectCalenderBusModal() {
        this.calenderBusLookupTableModal.id = this.tripActual.calenderBusId;
        this.calenderBusLookupTableModal.displayName = this.calenderBusTenantId;
        this.calenderBusLookupTableModal.show();
    }
        openSelectTripPlanedModal() {
        this.tripPlanedLookupTableModal.id = this.tripActual.tripPlanedId;
        this.tripPlanedLookupTableModal.displayName = this.tripPlanedTenantId;
        this.tripPlanedLookupTableModal.show();
    }
        openSelectTripByMinistryModal() {
        this.tripByMinistryLookupTableModal.id = this.tripActual.tripByMinistryId;
        this.tripByMinistryLookupTableModal.displayName = this.tripByMinistryTenantId;
        this.tripByMinistryLookupTableModal.show();
    }


        setRouteIdNull() {
        this.tripActual.routeId = null;
        this.routeLineNumber = '';
    }
        setCalenderBusIdNull() {
        this.tripActual.calenderBusId = null;
        this.calenderBusTenantId = '';
    }
        setTripPlanedIdNull() {
        this.tripActual.tripPlanedId = null;
        this.tripPlanedTenantId = '';
    }
        setTripByMinistryIdNull() {
        this.tripActual.tripByMinistryId = null;
        this.tripByMinistryTenantId = '';
    }


        getNewRouteId() {
        this.tripActual.routeId = this.routeLookupTableModal.id;
        this.routeLineNumber = this.routeLookupTableModal.displayName;
    }
        getNewCalenderBusId() {
        this.tripActual.calenderBusId = this.calenderBusLookupTableModal.id;
        this.calenderBusTenantId = this.calenderBusLookupTableModal.displayName;
    }
        getNewTripPlanedId() {
        this.tripActual.tripPlanedId = this.tripPlanedLookupTableModal.id;
        this.tripPlanedTenantId = this.tripPlanedLookupTableModal.displayName;
    }
        getNewTripByMinistryId() {
        this.tripActual.tripByMinistryId = this.tripByMinistryLookupTableModal.id;
        this.tripByMinistryTenantId = this.tripByMinistryLookupTableModal.displayName;
    }


    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
