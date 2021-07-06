import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripActualWitHDriverServiceProxy, TripActualWitHDriverDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditTripActualWitHDriverModalComponent } from './create-or-edit-tripActualWitHDriver-modal.component';
import { ViewTripActualWitHDriverModalComponent } from './view-tripActualWitHDriver-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { EntityTypeHistoryModalComponent } from '@app/shared/common/entityHistory/entity-type-history-modal.component';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './tripActualWitHDriver.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class TripActualWitHDriverComponent extends AppComponentBase {

    @ViewChild('createOrEditTripActualWitHDriverModal', {static: true}) createOrEditTripActualWitHDriverModal: CreateOrEditTripActualWitHDriverModalComponent;
    @ViewChild('viewTripActualWitHDriverModalComponent', {static: true}) viewTripActualWitHDriverModal: ViewTripActualWitHDriverModalComponent;
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
    maxTripDateFilter : moment.Moment;
		minTripDateFilter : moment.Moment;
    startTimeFilter = '';
    endTimeFilter = '';
    maxTotalHourFilter : number;
		maxTotalHourFilterEmpty : number;
		minTotalHourFilter : number;
		minTotalHourFilterEmpty : number;
    maxTripLengthFilter : number;
		maxTripLengthFilterEmpty : number;
		minTripLengthFilter : number;
		minTripLengthFilterEmpty : number;
    maxTripActualIDFilter : number;
		maxTripActualIDFilterEmpty : number;
		minTripActualIDFilter : number;
		minTripActualIDFilterEmpty : number;


    _entityTypeFullName = 'BringitPal.POPBUS.Trips.TripActualWitHDriver';
    entityHistoryEnabled = false;

    constructor(
        injector: Injector,
        private _tripActualWitHDriverServiceProxy: TripActualWitHDriverServiceProxy,
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

    getTripActualWitHDriver(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._tripActualWitHDriverServiceProxy.getAll(
            this.filterText,
            this.maxTripPlanIDFilter == null ? this.maxTripPlanIDFilterEmpty: this.maxTripPlanIDFilter,
            this.minTripPlanIDFilter == null ? this.minTripPlanIDFilterEmpty: this.minTripPlanIDFilter,
            this.maxDriverFilter == null ? this.maxDriverFilterEmpty: this.maxDriverFilter,
            this.minDriverFilter == null ? this.minDriverFilterEmpty: this.minDriverFilter,
            this.maxBusIDFilter == null ? this.maxBusIDFilterEmpty: this.maxBusIDFilter,
            this.minBusIDFilter == null ? this.minBusIDFilterEmpty: this.minBusIDFilter,
            this.maxTaskNoFilter == null ? this.maxTaskNoFilterEmpty: this.maxTaskNoFilter,
            this.minTaskNoFilter == null ? this.minTaskNoFilterEmpty: this.minTaskNoFilter,
            this.maxTripDateFilter,
            this.minTripDateFilter,
            this.startTimeFilter,
            this.endTimeFilter,
            this.maxTotalHourFilter == null ? this.maxTotalHourFilterEmpty: this.maxTotalHourFilter,
            this.minTotalHourFilter == null ? this.minTotalHourFilterEmpty: this.minTotalHourFilter,
            this.maxTripLengthFilter == null ? this.maxTripLengthFilterEmpty: this.maxTripLengthFilter,
            this.minTripLengthFilter == null ? this.minTripLengthFilterEmpty: this.minTripLengthFilter,
            this.maxTripActualIDFilter == null ? this.maxTripActualIDFilterEmpty: this.maxTripActualIDFilter,
            this.minTripActualIDFilter == null ? this.minTripActualIDFilterEmpty: this.minTripActualIDFilter,
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

    createTripActualWitHDriver(): void {
        this.createOrEditTripActualWitHDriverModal.show();
    }

    showHistory(tripActualWitHDriver: TripActualWitHDriverDto): void {
        this.entityTypeHistoryModal.show({
            entityId: tripActualWitHDriver.id.toString(),
            entityTypeFullName: this._entityTypeFullName,
            entityTypeDescription: ''
        });
    }

    deleteTripActualWitHDriver(tripActualWitHDriver: TripActualWitHDriverDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._tripActualWitHDriverServiceProxy.delete(tripActualWitHDriver.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._tripActualWitHDriverServiceProxy.getTripActualWitHDriverToExcel(
        this.filterText,
            this.maxTripPlanIDFilter == null ? this.maxTripPlanIDFilterEmpty: this.maxTripPlanIDFilter,
            this.minTripPlanIDFilter == null ? this.minTripPlanIDFilterEmpty: this.minTripPlanIDFilter,
            this.maxDriverFilter == null ? this.maxDriverFilterEmpty: this.maxDriverFilter,
            this.minDriverFilter == null ? this.minDriverFilterEmpty: this.minDriverFilter,
            this.maxBusIDFilter == null ? this.maxBusIDFilterEmpty: this.maxBusIDFilter,
            this.minBusIDFilter == null ? this.minBusIDFilterEmpty: this.minBusIDFilter,
            this.maxTaskNoFilter == null ? this.maxTaskNoFilterEmpty: this.maxTaskNoFilter,
            this.minTaskNoFilter == null ? this.minTaskNoFilterEmpty: this.minTaskNoFilter,
            this.maxTripDateFilter,
            this.minTripDateFilter,
            this.startTimeFilter,
            this.endTimeFilter,
            this.maxTotalHourFilter == null ? this.maxTotalHourFilterEmpty: this.maxTotalHourFilter,
            this.minTotalHourFilter == null ? this.minTotalHourFilterEmpty: this.minTotalHourFilter,
            this.maxTripLengthFilter == null ? this.maxTripLengthFilterEmpty: this.maxTripLengthFilter,
            this.minTripLengthFilter == null ? this.minTripLengthFilterEmpty: this.minTripLengthFilter,
            this.maxTripActualIDFilter == null ? this.maxTripActualIDFilterEmpty: this.maxTripActualIDFilter,
            this.minTripActualIDFilter == null ? this.minTripActualIDFilterEmpty: this.minTripActualIDFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
