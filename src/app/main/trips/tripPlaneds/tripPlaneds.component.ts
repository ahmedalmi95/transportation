import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripPlanedsServiceProxy, TripPlanedDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditTripPlanedModalComponent } from './create-or-edit-tripPlaned-modal.component';
import { ViewTripPlanedModalComponent } from './view-tripPlaned-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { EntityTypeHistoryModalComponent } from '@app/shared/common/entityHistory/entity-type-history-modal.component';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './tripPlaneds.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class TripPlanedsComponent extends AppComponentBase {

    @ViewChild('createOrEditTripPlanedModal', {static: true}) createOrEditTripPlanedModal: CreateOrEditTripPlanedModalComponent;
    @ViewChild('viewTripPlanedModalComponent', {static: true}) viewTripPlanedModal: ViewTripPlanedModalComponent;
    @ViewChild('entityTypeHistoryModal', {static: true}) entityTypeHistoryModal: EntityTypeHistoryModalComponent;
    @ViewChild('dataTable', {static: true}) dataTable: Table;
    @ViewChild('paginator', {static: true}) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxCalenderIDFilter : number;
		maxCalenderIDFilterEmpty : number;
		minCalenderIDFilter : number;
		minCalenderIDFilterEmpty : number;
    maxRouteIDFilter : number;
		maxRouteIDFilterEmpty : number;
		minRouteIDFilter : number;
		minRouteIDFilterEmpty : number;
    timeSpanFilter = '';
    maxTripMinistryFilter : number;
		maxTripMinistryFilterEmpty : number;
		minTripMinistryFilter : number;
		minTripMinistryFilterEmpty : number;
    isValidFilter = -1;
    endTimeSpanFilter = '';
        tripTypeNameFilter = '';


    _entityTypeFullName = 'BringitPal.POPBUS.Trips.TripPlaned';
    entityHistoryEnabled = false;

    constructor(
        injector: Injector,
        private _tripPlanedsServiceProxy: TripPlanedsServiceProxy,
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

    getTripPlaneds(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._tripPlanedsServiceProxy.getAll(
            this.filterText,
            this.maxCalenderIDFilter == null ? this.maxCalenderIDFilterEmpty: this.maxCalenderIDFilter,
            this.minCalenderIDFilter == null ? this.minCalenderIDFilterEmpty: this.minCalenderIDFilter,
            this.maxRouteIDFilter == null ? this.maxRouteIDFilterEmpty: this.maxRouteIDFilter,
            this.minRouteIDFilter == null ? this.minRouteIDFilterEmpty: this.minRouteIDFilter,
            this.timeSpanFilter,
            this.maxTripMinistryFilter == null ? this.maxTripMinistryFilterEmpty: this.maxTripMinistryFilter,
            this.minTripMinistryFilter == null ? this.minTripMinistryFilterEmpty: this.minTripMinistryFilter,
            this.isValidFilter,
            this.endTimeSpanFilter,
            this.tripTypeNameFilter,
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

    createTripPlaned(): void {
        this.createOrEditTripPlanedModal.show();
    }

    showHistory(tripPlaned: TripPlanedDto): void {
        this.entityTypeHistoryModal.show({
            entityId: tripPlaned.id.toString(),
            entityTypeFullName: this._entityTypeFullName,
            entityTypeDescription: ''
        });
    }

    deleteTripPlaned(tripPlaned: TripPlanedDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._tripPlanedsServiceProxy.delete(tripPlaned.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._tripPlanedsServiceProxy.getTripPlanedsToExcel(
        this.filterText,
            this.maxCalenderIDFilter == null ? this.maxCalenderIDFilterEmpty: this.maxCalenderIDFilter,
            this.minCalenderIDFilter == null ? this.minCalenderIDFilterEmpty: this.minCalenderIDFilter,
            this.maxRouteIDFilter == null ? this.maxRouteIDFilterEmpty: this.maxRouteIDFilter,
            this.minRouteIDFilter == null ? this.minRouteIDFilterEmpty: this.minRouteIDFilter,
            this.timeSpanFilter,
            this.maxTripMinistryFilter == null ? this.maxTripMinistryFilterEmpty: this.maxTripMinistryFilter,
            this.minTripMinistryFilter == null ? this.minTripMinistryFilterEmpty: this.minTripMinistryFilter,
            this.isValidFilter,
            this.endTimeSpanFilter,
            this.tripTypeNameFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
