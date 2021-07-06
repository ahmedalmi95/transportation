import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripActualRoutes_StationServiceProxy, TripActualRoutes_StationDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditTripActualRoutes_StationModalComponent } from './create-or-edit-tripActualRoutes_Station-modal.component';
import { ViewTripActualRoutes_StationModalComponent } from './view-tripActualRoutes_Station-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { EntityTypeHistoryModalComponent } from '@app/shared/common/entityHistory/entity-type-history-modal.component';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './tripActualRoutes_Station.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class TripActualRoutes_StationComponent extends AppComponentBase {

    @ViewChild('createOrEditTripActualRoutes_StationModal', {static: true}) createOrEditTripActualRoutes_StationModal: CreateOrEditTripActualRoutes_StationModalComponent;
    @ViewChild('viewTripActualRoutes_StationModalComponent', {static: true}) viewTripActualRoutes_StationModal: ViewTripActualRoutes_StationModalComponent;
    @ViewChild('entityTypeHistoryModal', {static: true}) entityTypeHistoryModal: EntityTypeHistoryModalComponent;
    @ViewChild('dataTable', {static: true}) dataTable: Table;
    @ViewChild('paginator', {static: true}) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxRoutesIDFilter : number;
		maxRoutesIDFilterEmpty : number;
		minRoutesIDFilter : number;
		minRoutesIDFilterEmpty : number;
    maxStationCodeFilter : number;
		maxStationCodeFilterEmpty : number;
		minStationCodeFilter : number;
		minStationCodeFilterEmpty : number;
    maxStationOrderFilter : number;
		maxStationOrderFilterEmpty : number;
		minStationOrderFilter : number;
		minStationOrderFilterEmpty : number;
    maxDistanceFStartFilter : number;
		maxDistanceFStartFilterEmpty : number;
		minDistanceFStartFilter : number;
		minDistanceFStartFilterEmpty : number;
    maxDistanceFPrviousStFilter : number;
		maxDistanceFPrviousStFilterEmpty : number;
		minDistanceFPrviousStFilter : number;
		minDistanceFPrviousStFilterEmpty : number;
    timefrStartStationFilter = '';
    timefrPrviousStationFilter = '';
    timeSpendonStationFilter = '';
    maxTripActualIDFilter : number;
		maxTripActualIDFilterEmpty : number;
		minTripActualIDFilter : number;
		minTripActualIDFilterEmpty : number;


    _entityTypeFullName = 'BringitPal.POPBUS.Trips.TripActualRoutes_Station';
    entityHistoryEnabled = false;

    constructor(
        injector: Injector,
        private _tripActualRoutes_StationServiceProxy: TripActualRoutes_StationServiceProxy,
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

    getTripActualRoutes_Station(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._tripActualRoutes_StationServiceProxy.getAll(
            this.filterText,
            this.maxRoutesIDFilter == null ? this.maxRoutesIDFilterEmpty: this.maxRoutesIDFilter,
            this.minRoutesIDFilter == null ? this.minRoutesIDFilterEmpty: this.minRoutesIDFilter,
            this.maxStationCodeFilter == null ? this.maxStationCodeFilterEmpty: this.maxStationCodeFilter,
            this.minStationCodeFilter == null ? this.minStationCodeFilterEmpty: this.minStationCodeFilter,
            this.maxStationOrderFilter == null ? this.maxStationOrderFilterEmpty: this.maxStationOrderFilter,
            this.minStationOrderFilter == null ? this.minStationOrderFilterEmpty: this.minStationOrderFilter,
            this.maxDistanceFStartFilter == null ? this.maxDistanceFStartFilterEmpty: this.maxDistanceFStartFilter,
            this.minDistanceFStartFilter == null ? this.minDistanceFStartFilterEmpty: this.minDistanceFStartFilter,
            this.maxDistanceFPrviousStFilter == null ? this.maxDistanceFPrviousStFilterEmpty: this.maxDistanceFPrviousStFilter,
            this.minDistanceFPrviousStFilter == null ? this.minDistanceFPrviousStFilterEmpty: this.minDistanceFPrviousStFilter,
            this.timefrStartStationFilter,
            this.timefrPrviousStationFilter,
            this.timeSpendonStationFilter,
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

    createTripActualRoutes_Station(): void {
        this.createOrEditTripActualRoutes_StationModal.show();
    }

    showHistory(tripActualRoutes_Station: TripActualRoutes_StationDto): void {
        this.entityTypeHistoryModal.show({
            entityId: tripActualRoutes_Station.id.toString(),
            entityTypeFullName: this._entityTypeFullName,
            entityTypeDescription: ''
        });
    }

    deleteTripActualRoutes_Station(tripActualRoutes_Station: TripActualRoutes_StationDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._tripActualRoutes_StationServiceProxy.delete(tripActualRoutes_Station.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._tripActualRoutes_StationServiceProxy.getTripActualRoutes_StationToExcel(
        this.filterText,
            this.maxRoutesIDFilter == null ? this.maxRoutesIDFilterEmpty: this.maxRoutesIDFilter,
            this.minRoutesIDFilter == null ? this.minRoutesIDFilterEmpty: this.minRoutesIDFilter,
            this.maxStationCodeFilter == null ? this.maxStationCodeFilterEmpty: this.maxStationCodeFilter,
            this.minStationCodeFilter == null ? this.minStationCodeFilterEmpty: this.minStationCodeFilter,
            this.maxStationOrderFilter == null ? this.maxStationOrderFilterEmpty: this.maxStationOrderFilter,
            this.minStationOrderFilter == null ? this.minStationOrderFilterEmpty: this.minStationOrderFilter,
            this.maxDistanceFStartFilter == null ? this.maxDistanceFStartFilterEmpty: this.maxDistanceFStartFilter,
            this.minDistanceFStartFilter == null ? this.minDistanceFStartFilterEmpty: this.minDistanceFStartFilter,
            this.maxDistanceFPrviousStFilter == null ? this.maxDistanceFPrviousStFilterEmpty: this.maxDistanceFPrviousStFilter,
            this.minDistanceFPrviousStFilter == null ? this.minDistanceFPrviousStFilterEmpty: this.minDistanceFPrviousStFilter,
            this.timefrStartStationFilter,
            this.timefrPrviousStationFilter,
            this.timeSpendonStationFilter,
            this.maxTripActualIDFilter == null ? this.maxTripActualIDFilterEmpty: this.maxTripActualIDFilter,
            this.minTripActualIDFilter == null ? this.minTripActualIDFilterEmpty: this.minTripActualIDFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
