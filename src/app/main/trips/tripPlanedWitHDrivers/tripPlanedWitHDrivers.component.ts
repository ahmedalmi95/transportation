import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripPlanedWitHDriversServiceProxy, TripPlanedWitHDriverDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditTripPlanedWitHDriverModalComponent } from './create-or-edit-tripPlanedWitHDriver-modal.component';
import { ViewTripPlanedWitHDriverModalComponent } from './view-tripPlanedWitHDriver-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './tripPlanedWitHDrivers.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class TripPlanedWitHDriversComponent extends AppComponentBase {

    @ViewChild('createOrEditTripPlanedWitHDriverModal', {static: true}) createOrEditTripPlanedWitHDriverModal: CreateOrEditTripPlanedWitHDriverModalComponent;
    @ViewChild('viewTripPlanedWitHDriverModalComponent', {static: true}) viewTripPlanedWitHDriverModal: ViewTripPlanedWitHDriverModalComponent;
    @ViewChild('dataTable', {static: true}) dataTable: Table;
    @ViewChild('paginator', {static: true}) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxTripPlanIDFilter : number;
		maxTripPlanIDFilterEmpty : number;
		minTripPlanIDFilter : number;
		minTripPlanIDFilterEmpty : number;
    maxDriverFilter : number;
		maxDriverFilterEmpty : number;
		minDriverFilter : number;
		minDriverFilterEmpty : number;
    maxBusIDFilter : number;
		maxBusIDFilterEmpty : number;
		minBusIDFilter : number;
		minBusIDFilterEmpty : number;
    maxTaskNoFilter : number;
		maxTaskNoFilterEmpty : number;
		minTaskNoFilter : number;
		minTaskNoFilterEmpty : number;
    notesFilter = '';
    busGroupFilter = '';




    constructor(
        injector: Injector,
        private _tripPlanedWitHDriversServiceProxy: TripPlanedWitHDriversServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getTripPlanedWitHDrivers(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._tripPlanedWitHDriversServiceProxy.getAll(
            this.filterText,
            this.maxTripPlanIDFilter == null ? this.maxTripPlanIDFilterEmpty: this.maxTripPlanIDFilter,
            this.minTripPlanIDFilter == null ? this.minTripPlanIDFilterEmpty: this.minTripPlanIDFilter,
            this.maxDriverFilter == null ? this.maxDriverFilterEmpty: this.maxDriverFilter,
            this.minDriverFilter == null ? this.minDriverFilterEmpty: this.minDriverFilter,
            this.maxBusIDFilter == null ? this.maxBusIDFilterEmpty: this.maxBusIDFilter,
            this.minBusIDFilter == null ? this.minBusIDFilterEmpty: this.minBusIDFilter,
            this.maxTaskNoFilter == null ? this.maxTaskNoFilterEmpty: this.maxTaskNoFilter,
            this.minTaskNoFilter == null ? this.minTaskNoFilterEmpty: this.minTaskNoFilter,
            this.notesFilter,
            this.busGroupFilter,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getSkipCount(this.paginator, event),
            this.primengTableHelper.getMaxResultCount(this.paginator, event)
        ).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    createTripPlanedWitHDriver(): void {
        this.createOrEditTripPlanedWitHDriverModal.show();
    }

    deleteTripPlanedWitHDriver(tripPlanedWitHDriver: TripPlanedWitHDriverDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._tripPlanedWitHDriversServiceProxy.delete(tripPlanedWitHDriver.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._tripPlanedWitHDriversServiceProxy.getTripPlanedWitHDriversToExcel(
        this.filterText,
            this.maxTripPlanIDFilter == null ? this.maxTripPlanIDFilterEmpty: this.maxTripPlanIDFilter,
            this.minTripPlanIDFilter == null ? this.minTripPlanIDFilterEmpty: this.minTripPlanIDFilter,
            this.maxDriverFilter == null ? this.maxDriverFilterEmpty: this.maxDriverFilter,
            this.minDriverFilter == null ? this.minDriverFilterEmpty: this.minDriverFilter,
            this.maxBusIDFilter == null ? this.maxBusIDFilterEmpty: this.maxBusIDFilter,
            this.minBusIDFilter == null ? this.minBusIDFilterEmpty: this.minBusIDFilter,
            this.maxTaskNoFilter == null ? this.maxTaskNoFilterEmpty: this.maxTaskNoFilter,
            this.minTaskNoFilter == null ? this.minTaskNoFilterEmpty: this.minTaskNoFilter,
            this.notesFilter,
            this.busGroupFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
