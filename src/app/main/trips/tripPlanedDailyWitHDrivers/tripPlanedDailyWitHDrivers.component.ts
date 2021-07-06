import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripPlanedDailyWitHDriversServiceProxy, TripPlanedDailyWitHDriverDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditTripPlanedDailyWitHDriverModalComponent } from './create-or-edit-tripPlanedDailyWitHDriver-modal.component';
import { ViewTripPlanedDailyWitHDriverModalComponent } from './view-tripPlanedDailyWitHDriver-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { EntityTypeHistoryModalComponent } from '@app/shared/common/entityHistory/entity-type-history-modal.component';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './tripPlanedDailyWitHDrivers.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class TripPlanedDailyWitHDriversComponent extends AppComponentBase {

    @ViewChild('createOrEditTripPlanedDailyWitHDriverModal', {static: true}) createOrEditTripPlanedDailyWitHDriverModal: CreateOrEditTripPlanedDailyWitHDriverModalComponent;
    @ViewChild('viewTripPlanedDailyWitHDriverModalComponent', {static: true}) viewTripPlanedDailyWitHDriverModal: ViewTripPlanedDailyWitHDriverModalComponent;
    @ViewChild('entityTypeHistoryModal', {static: true}) entityTypeHistoryModal: EntityTypeHistoryModalComponent;
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
    maxWorkingdayFilter : moment.Moment;
		minWorkingdayFilter : moment.Moment;


    _entityTypeFullName = 'BringitPal.POPBUS.Trips.TripPlanedDailyWitHDriver';
    entityHistoryEnabled = false;

    constructor(
        injector: Injector,
        private _tripPlanedDailyWitHDriversServiceProxy: TripPlanedDailyWitHDriversServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.entityHistoryEnabled = this.setIsEntityHistoryEnabled();
    }

    private setIsEntityHistoryEnabled(): boolean {
        let customSettings = (abp as any).custom;
        return customSettings.EntityHistory && customSettings.EntityHistory.isEnabled && _.filter(customSettings.EntityHistory.enabledEntities, entityType => entityType === this._entityTypeFullName).length === 1;
    }

    getTripPlanedDailyWitHDrivers(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._tripPlanedDailyWitHDriversServiceProxy.getAll(
            this.filterText,
            this.maxTripPlanIDFilter == null ? this.maxTripPlanIDFilterEmpty: this.maxTripPlanIDFilter,
            this.minTripPlanIDFilter == null ? this.minTripPlanIDFilterEmpty: this.minTripPlanIDFilter,
            this.maxDriverFilter == null ? this.maxDriverFilterEmpty: this.maxDriverFilter,
            this.minDriverFilter == null ? this.minDriverFilterEmpty: this.minDriverFilter,
            this.maxBusIDFilter == null ? this.maxBusIDFilterEmpty: this.maxBusIDFilter,
            this.minBusIDFilter == null ? this.minBusIDFilterEmpty: this.minBusIDFilter,
            this.maxTaskNoFilter == null ? this.maxTaskNoFilterEmpty: this.maxTaskNoFilter,
            this.minTaskNoFilter == null ? this.minTaskNoFilterEmpty: this.minTaskNoFilter,
            this.maxWorkingdayFilter,
            this.minWorkingdayFilter,
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

    createTripPlanedDailyWitHDriver(): void {
        this.createOrEditTripPlanedDailyWitHDriverModal.show();
    }

    showHistory(tripPlanedDailyWitHDriver: TripPlanedDailyWitHDriverDto): void {
        this.entityTypeHistoryModal.show({
            entityId: tripPlanedDailyWitHDriver.id.toString(),
            entityTypeFullName: this._entityTypeFullName,
            entityTypeDescription: ''
        });
    }

    deleteTripPlanedDailyWitHDriver(tripPlanedDailyWitHDriver: TripPlanedDailyWitHDriverDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._tripPlanedDailyWitHDriversServiceProxy.delete(tripPlanedDailyWitHDriver.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._tripPlanedDailyWitHDriversServiceProxy.getTripPlanedDailyWitHDriversToExcel(
        this.filterText,
            this.maxTripPlanIDFilter == null ? this.maxTripPlanIDFilterEmpty: this.maxTripPlanIDFilter,
            this.minTripPlanIDFilter == null ? this.minTripPlanIDFilterEmpty: this.minTripPlanIDFilter,
            this.maxDriverFilter == null ? this.maxDriverFilterEmpty: this.maxDriverFilter,
            this.minDriverFilter == null ? this.minDriverFilterEmpty: this.minDriverFilter,
            this.maxBusIDFilter == null ? this.maxBusIDFilterEmpty: this.maxBusIDFilter,
            this.minBusIDFilter == null ? this.minBusIDFilterEmpty: this.minBusIDFilter,
            this.maxTaskNoFilter == null ? this.maxTaskNoFilterEmpty: this.maxTaskNoFilter,
            this.minTaskNoFilter == null ? this.minTaskNoFilterEmpty: this.minTaskNoFilter,
            this.maxWorkingdayFilter,
            this.minWorkingdayFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
