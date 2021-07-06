import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripActualServiceProxy, TripActualDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditTripActualModalComponent } from './create-or-edit-tripActual-modal.component';
import { ViewTripActualModalComponent } from './view-tripActual-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { EntityTypeHistoryModalComponent } from '@app/shared/common/entityHistory/entity-type-history-modal.component';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './tripActual.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class TripActualComponent extends AppComponentBase {

    @ViewChild('createOrEditTripActualModal', {static: true}) createOrEditTripActualModal: CreateOrEditTripActualModalComponent;
    @ViewChild('viewTripActualModalComponent', {static: true}) viewTripActualModal: ViewTripActualModalComponent;
    @ViewChild('entityTypeHistoryModal', {static: true}) entityTypeHistoryModal: EntityTypeHistoryModalComponent;
    @ViewChild('dataTable', {static: true}) dataTable: Table;
    @ViewChild('paginator', {static: true}) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    timeSpanFilter = '';
    maxEndStationIDFilter : number;
		maxEndStationIDFilterEmpty : number;
		minEndStationIDFilter : number;
		minEndStationIDFilterEmpty : number;
    maxStartStationIDFilter : number;
		maxStartStationIDFilterEmpty : number;
		minStartStationIDFilter : number;
		minStartStationIDFilterEmpty : number;
    startStationFilter = '';
    endStationFilter = '';
    maxTripDateFilter : moment.Moment;
		minTripDateFilter : moment.Moment;
    controlStartTimeFilter = '';
    isdoneFilter = -1;
        routeLineNumberFilter = '';
        calenderBusTenantIdFilter = '';
        tripPlanedTenantIdFilter = '';
        tripByMinistryTenantIdFilter = '';


    _entityTypeFullName = 'BringitPal.POPBUS.Trips.TripActual';
    entityHistoryEnabled = false;

    constructor(
        injector: Injector,
        private _tripActualServiceProxy: TripActualServiceProxy,
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

    getTripActual(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._tripActualServiceProxy.getAll(
            this.filterText,
            this.timeSpanFilter,
            this.maxEndStationIDFilter == null ? this.maxEndStationIDFilterEmpty: this.maxEndStationIDFilter,
            this.minEndStationIDFilter == null ? this.minEndStationIDFilterEmpty: this.minEndStationIDFilter,
            this.maxStartStationIDFilter == null ? this.maxStartStationIDFilterEmpty: this.maxStartStationIDFilter,
            this.minStartStationIDFilter == null ? this.minStartStationIDFilterEmpty: this.minStartStationIDFilter,
            this.startStationFilter,
            this.endStationFilter,
            this.maxTripDateFilter,
            this.minTripDateFilter,
            this.controlStartTimeFilter,
            this.isdoneFilter,
            this.routeLineNumberFilter,
            this.calenderBusTenantIdFilter,
            this.tripPlanedTenantIdFilter,
            this.tripByMinistryTenantIdFilter,
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

    createTripActual(): void {
        this.createOrEditTripActualModal.show();
    }

    showHistory(tripActual: TripActualDto): void {
        this.entityTypeHistoryModal.show({
            entityId: tripActual.id.toString(),
            entityTypeFullName: this._entityTypeFullName,
            entityTypeDescription: ''
        });
    }

    deleteTripActual(tripActual: TripActualDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._tripActualServiceProxy.delete(tripActual.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._tripActualServiceProxy.getTripActualToExcel(
        this.filterText,
            this.timeSpanFilter,
            this.maxEndStationIDFilter == null ? this.maxEndStationIDFilterEmpty: this.maxEndStationIDFilter,
            this.minEndStationIDFilter == null ? this.minEndStationIDFilterEmpty: this.minEndStationIDFilter,
            this.maxStartStationIDFilter == null ? this.maxStartStationIDFilterEmpty: this.maxStartStationIDFilter,
            this.minStartStationIDFilter == null ? this.minStartStationIDFilterEmpty: this.minStartStationIDFilter,
            this.startStationFilter,
            this.endStationFilter,
            this.maxTripDateFilter,
            this.minTripDateFilter,
            this.controlStartTimeFilter,
            this.isdoneFilter,
            this.routeLineNumberFilter,
            this.calenderBusTenantIdFilter,
            this.tripPlanedTenantIdFilter,
            this.tripByMinistryTenantIdFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
