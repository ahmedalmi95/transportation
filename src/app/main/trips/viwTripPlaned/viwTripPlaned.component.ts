import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViwTripPlanedServiceProxy, ViwTripPlanedDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditViwTripPlanedModalComponent } from './create-or-edit-viwTripPlaned-modal.component';
import { ViewViwTripPlanedModalComponent } from './view-viwTripPlaned-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './viwTripPlaned.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class ViwTripPlanedComponent extends AppComponentBase {

    @ViewChild('createOrEditViwTripPlanedModal', {static: true}) createOrEditViwTripPlanedModal: CreateOrEditViwTripPlanedModalComponent;
    @ViewChild('viewViwTripPlanedModalComponent', {static: true}) viewViwTripPlanedModal: ViewViwTripPlanedModalComponent;
    @ViewChild('dataTable', {static: true}) dataTable: Table;
    @ViewChild('paginator', {static: true}) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxTrpPlanCalnderIDFilter : number;
		maxTrpPlanCalnderIDFilterEmpty : number;
		minTrpPlanCalnderIDFilter : number;
		minTrpPlanCalnderIDFilterEmpty : number;
    trpPlanStartTimeFilter = '';
    maxTrpPlanLineNumberFilter : number;
		maxTrpPlanLineNumberFilterEmpty : number;
		minTrpPlanLineNumberFilter : number;
		minTrpPlanLineNumberFilterEmpty : number;
    maxTrpPlanDirectionFilter : number;
		maxTrpPlanDirectionFilterEmpty : number;
		minTrpPlanDirectionFilter : number;
		minTrpPlanDirectionFilterEmpty : number;
    trpPlanDriverNameFilter = '';
    trpPlanBusNumberFilter = '';
    maxTripMinistryIDFilter : number;
		maxTripMinistryIDFilterEmpty : number;
		minTripMinistryIDFilter : number;
		minTripMinistryIDFilterEmpty : number;
    maxTripMinistryLineNumberFilter : number;
		maxTripMinistryLineNumberFilterEmpty : number;
		minTripMinistryLineNumberFilter : number;
		minTripMinistryLineNumberFilterEmpty : number;
    maxTripMinistryDirectionFilter : number;
		maxTripMinistryDirectionFilterEmpty : number;
		minTripMinistryDirectionFilter : number;
		minTripMinistryDirectionFilterEmpty : number;
    maxTripMinistryCalenderIDFilter : number;
		maxTripMinistryCalenderIDFilterEmpty : number;
		minTripMinistryCalenderIDFilter : number;
		minTripMinistryCalenderIDFilterEmpty : number;
    tripMinistryTimeSpanFilter = '';
    tripMinistryMondayFilter = -1;
    tripMinistryTuesdayFilter = -1;
    tripMinistryWensdayFilter = -1;
    tripMinistryFridayFilter = -1;
    tripMinistryThursdayFilter = -1;
    tripMinistrySaturdayFilter = -1;
    tripMinistrySundayFilter = -1;
    maxTripMinistryStart_dateFilter : moment.Moment;
		minTripMinistryStart_dateFilter : moment.Moment;
    maxTripMinistryRouteIDFilter : number;
		maxTripMinistryRouteIDFilterEmpty : number;
		minTripMinistryRouteIDFilter : number;
		minTripMinistryRouteIDFilterEmpty : number;
    trpPlanmondayFilter = -1;
    trpPlanTuesdayFilter = -1;
    trpPlanWensdayFilter = -1;
    trpPlanthursdayFilter = -1;
    trpPlanfridayFilter = -1;
    trpPlansaturdayFilter = -1;
    trpPlansundayFilter = -1;
    maxTrpPlanStart_dateFilter : moment.Moment;
		minTrpPlanStart_dateFilter : moment.Moment;
    maxTrpPlanEnd_dateFilter : moment.Moment;
		minTrpPlanEnd_dateFilter : moment.Moment;
    maxTrpPlanTaskNoFilter : number;
		maxTrpPlanTaskNoFilterEmpty : number;
		minTrpPlanTaskNoFilter : number;
		minTrpPlanTaskNoFilterEmpty : number;
    maxTripPlanedIDFilter : number;
		maxTripPlanedIDFilterEmpty : number;
		minTripPlanedIDFilter : number;
		minTripPlanedIDFilterEmpty : number;
    maxDriverIDPPlanedFilter : number;
		maxDriverIDPPlanedFilterEmpty : number;
		minDriverIDPPlanedFilter : number;
		minDriverIDPPlanedFilterEmpty : number;
    maxBUSIDPlanlnedFilter : number;
		maxBUSIDPlanlnedFilterEmpty : number;
		minBUSIDPlanlnedFilter : number;
		minBUSIDPlanlnedFilterEmpty : number;
    trpPlanISValidFilter = -1;
    trpPlanEndTimeFilter = '';
    maxTrpPlanRouteIDFilter : number;
		maxTrpPlanRouteIDFilterEmpty : number;
		minTrpPlanRouteIDFilter : number;
		minTrpPlanRouteIDFilterEmpty : number;
    maxCalenderIDFilter : number;
		maxCalenderIDFilterEmpty : number;
		minCalenderIDFilter : number;
		minCalenderIDFilterEmpty : number;
    maxViwTripPlanedDailyFilter : number;
		maxViwTripPlanedDailyFilterEmpty : number;
		minViwTripPlanedDailyFilter : number;
		minViwTripPlanedDailyFilterEmpty : number;
    catSedorFilter = '';
    notesFilter = '';
    busGroupFilter = '';
    maxDriverFilter : number;
		maxDriverFilterEmpty : number;
		minDriverFilter : number;
		minDriverFilterEmpty : number;
    maxBusIDFilter : number;
		maxBusIDFilterEmpty : number;
		minBusIDFilter : number;
		minBusIDFilterEmpty : number;




    constructor(
        injector: Injector,
        private _viwTripPlanedServiceProxy: ViwTripPlanedServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getViwTripPlaned(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._viwTripPlanedServiceProxy.getAll(
            this.filterText,
            this.maxTrpPlanCalnderIDFilter == null ? this.maxTrpPlanCalnderIDFilterEmpty: this.maxTrpPlanCalnderIDFilter,
            this.minTrpPlanCalnderIDFilter == null ? this.minTrpPlanCalnderIDFilterEmpty: this.minTrpPlanCalnderIDFilter,
            this.trpPlanStartTimeFilter,
            this.maxTrpPlanLineNumberFilter == null ? this.maxTrpPlanLineNumberFilterEmpty: this.maxTrpPlanLineNumberFilter,
            this.minTrpPlanLineNumberFilter == null ? this.minTrpPlanLineNumberFilterEmpty: this.minTrpPlanLineNumberFilter,
            this.maxTrpPlanDirectionFilter == null ? this.maxTrpPlanDirectionFilterEmpty: this.maxTrpPlanDirectionFilter,
            this.minTrpPlanDirectionFilter == null ? this.minTrpPlanDirectionFilterEmpty: this.minTrpPlanDirectionFilter,
            this.trpPlanDriverNameFilter,
            this.trpPlanBusNumberFilter,
            this.maxTripMinistryIDFilter == null ? this.maxTripMinistryIDFilterEmpty: this.maxTripMinistryIDFilter,
            this.minTripMinistryIDFilter == null ? this.minTripMinistryIDFilterEmpty: this.minTripMinistryIDFilter,
            this.maxTripMinistryLineNumberFilter == null ? this.maxTripMinistryLineNumberFilterEmpty: this.maxTripMinistryLineNumberFilter,
            this.minTripMinistryLineNumberFilter == null ? this.minTripMinistryLineNumberFilterEmpty: this.minTripMinistryLineNumberFilter,
            this.maxTripMinistryDirectionFilter == null ? this.maxTripMinistryDirectionFilterEmpty: this.maxTripMinistryDirectionFilter,
            this.minTripMinistryDirectionFilter == null ? this.minTripMinistryDirectionFilterEmpty: this.minTripMinistryDirectionFilter,
            this.maxTripMinistryCalenderIDFilter == null ? this.maxTripMinistryCalenderIDFilterEmpty: this.maxTripMinistryCalenderIDFilter,
            this.minTripMinistryCalenderIDFilter == null ? this.minTripMinistryCalenderIDFilterEmpty: this.minTripMinistryCalenderIDFilter,
            this.tripMinistryTimeSpanFilter,
            this.tripMinistryMondayFilter,
            this.tripMinistryTuesdayFilter,
            this.tripMinistryWensdayFilter,
            this.tripMinistryFridayFilter,
            this.tripMinistryThursdayFilter,
            this.tripMinistrySaturdayFilter,
            this.tripMinistrySundayFilter,
            this.maxTripMinistryStart_dateFilter,
            this.minTripMinistryStart_dateFilter,
            this.maxTripMinistryRouteIDFilter == null ? this.maxTripMinistryRouteIDFilterEmpty: this.maxTripMinistryRouteIDFilter,
            this.minTripMinistryRouteIDFilter == null ? this.minTripMinistryRouteIDFilterEmpty: this.minTripMinistryRouteIDFilter,
            this.trpPlanmondayFilter,
            this.trpPlanTuesdayFilter,
            this.trpPlanWensdayFilter,
            this.trpPlanthursdayFilter,
            this.trpPlanfridayFilter,
            this.trpPlansaturdayFilter,
            this.trpPlansundayFilter,
            this.maxTrpPlanStart_dateFilter,
            this.minTrpPlanStart_dateFilter,
            this.maxTrpPlanEnd_dateFilter,
            this.minTrpPlanEnd_dateFilter,
            this.maxTrpPlanTaskNoFilter == null ? this.maxTrpPlanTaskNoFilterEmpty: this.maxTrpPlanTaskNoFilter,
            this.minTrpPlanTaskNoFilter == null ? this.minTrpPlanTaskNoFilterEmpty: this.minTrpPlanTaskNoFilter,
            this.maxTripPlanedIDFilter == null ? this.maxTripPlanedIDFilterEmpty: this.maxTripPlanedIDFilter,
            this.minTripPlanedIDFilter == null ? this.minTripPlanedIDFilterEmpty: this.minTripPlanedIDFilter,
            this.maxDriverIDPPlanedFilter == null ? this.maxDriverIDPPlanedFilterEmpty: this.maxDriverIDPPlanedFilter,
            this.minDriverIDPPlanedFilter == null ? this.minDriverIDPPlanedFilterEmpty: this.minDriverIDPPlanedFilter,
            this.maxBUSIDPlanlnedFilter == null ? this.maxBUSIDPlanlnedFilterEmpty: this.maxBUSIDPlanlnedFilter,
            this.minBUSIDPlanlnedFilter == null ? this.minBUSIDPlanlnedFilterEmpty: this.minBUSIDPlanlnedFilter,
            this.trpPlanISValidFilter,
            this.trpPlanEndTimeFilter,
            this.maxTrpPlanRouteIDFilter == null ? this.maxTrpPlanRouteIDFilterEmpty: this.maxTrpPlanRouteIDFilter,
            this.minTrpPlanRouteIDFilter == null ? this.minTrpPlanRouteIDFilterEmpty: this.minTrpPlanRouteIDFilter,
            this.maxCalenderIDFilter == null ? this.maxCalenderIDFilterEmpty: this.maxCalenderIDFilter,
            this.minCalenderIDFilter == null ? this.minCalenderIDFilterEmpty: this.minCalenderIDFilter,
            this.maxViwTripPlanedDailyFilter == null ? this.maxViwTripPlanedDailyFilterEmpty: this.maxViwTripPlanedDailyFilter,
            this.minViwTripPlanedDailyFilter == null ? this.minViwTripPlanedDailyFilterEmpty: this.minViwTripPlanedDailyFilter,
            this.catSedorFilter,
            this.notesFilter,
            this.busGroupFilter,
            this.maxDriverFilter == null ? this.maxDriverFilterEmpty: this.maxDriverFilter,
            this.minDriverFilter == null ? this.minDriverFilterEmpty: this.minDriverFilter,
            this.maxBusIDFilter == null ? this.maxBusIDFilterEmpty: this.maxBusIDFilter,
            this.minBusIDFilter == null ? this.minBusIDFilterEmpty: this.minBusIDFilter,
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

    createViwTripPlaned(): void {
        this.createOrEditViwTripPlanedModal.show();
    }

    deleteViwTripPlaned(viwTripPlaned: ViwTripPlanedDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._viwTripPlanedServiceProxy.delete(viwTripPlaned.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._viwTripPlanedServiceProxy.getViwTripPlanedToExcel(
        this.filterText,
            this.maxTrpPlanCalnderIDFilter == null ? this.maxTrpPlanCalnderIDFilterEmpty: this.maxTrpPlanCalnderIDFilter,
            this.minTrpPlanCalnderIDFilter == null ? this.minTrpPlanCalnderIDFilterEmpty: this.minTrpPlanCalnderIDFilter,
            this.trpPlanStartTimeFilter,
            this.maxTrpPlanLineNumberFilter == null ? this.maxTrpPlanLineNumberFilterEmpty: this.maxTrpPlanLineNumberFilter,
            this.minTrpPlanLineNumberFilter == null ? this.minTrpPlanLineNumberFilterEmpty: this.minTrpPlanLineNumberFilter,
            this.maxTrpPlanDirectionFilter == null ? this.maxTrpPlanDirectionFilterEmpty: this.maxTrpPlanDirectionFilter,
            this.minTrpPlanDirectionFilter == null ? this.minTrpPlanDirectionFilterEmpty: this.minTrpPlanDirectionFilter,
            this.trpPlanDriverNameFilter,
            this.trpPlanBusNumberFilter,
            this.maxTripMinistryIDFilter == null ? this.maxTripMinistryIDFilterEmpty: this.maxTripMinistryIDFilter,
            this.minTripMinistryIDFilter == null ? this.minTripMinistryIDFilterEmpty: this.minTripMinistryIDFilter,
            this.maxTripMinistryLineNumberFilter == null ? this.maxTripMinistryLineNumberFilterEmpty: this.maxTripMinistryLineNumberFilter,
            this.minTripMinistryLineNumberFilter == null ? this.minTripMinistryLineNumberFilterEmpty: this.minTripMinistryLineNumberFilter,
            this.maxTripMinistryDirectionFilter == null ? this.maxTripMinistryDirectionFilterEmpty: this.maxTripMinistryDirectionFilter,
            this.minTripMinistryDirectionFilter == null ? this.minTripMinistryDirectionFilterEmpty: this.minTripMinistryDirectionFilter,
            this.maxTripMinistryCalenderIDFilter == null ? this.maxTripMinistryCalenderIDFilterEmpty: this.maxTripMinistryCalenderIDFilter,
            this.minTripMinistryCalenderIDFilter == null ? this.minTripMinistryCalenderIDFilterEmpty: this.minTripMinistryCalenderIDFilter,
            this.tripMinistryTimeSpanFilter,
            this.tripMinistryMondayFilter,
            this.tripMinistryTuesdayFilter,
            this.tripMinistryWensdayFilter,
            this.tripMinistryFridayFilter,
            this.tripMinistryThursdayFilter,
            this.tripMinistrySaturdayFilter,
            this.tripMinistrySundayFilter,
            this.maxTripMinistryStart_dateFilter,
            this.minTripMinistryStart_dateFilter,
            this.maxTripMinistryRouteIDFilter == null ? this.maxTripMinistryRouteIDFilterEmpty: this.maxTripMinistryRouteIDFilter,
            this.minTripMinistryRouteIDFilter == null ? this.minTripMinistryRouteIDFilterEmpty: this.minTripMinistryRouteIDFilter,
            this.trpPlanmondayFilter,
            this.trpPlanTuesdayFilter,
            this.trpPlanWensdayFilter,
            this.trpPlanthursdayFilter,
            this.trpPlanfridayFilter,
            this.trpPlansaturdayFilter,
            this.trpPlansundayFilter,
            this.maxTrpPlanStart_dateFilter,
            this.minTrpPlanStart_dateFilter,
            this.maxTrpPlanEnd_dateFilter,
            this.minTrpPlanEnd_dateFilter,
            this.maxTrpPlanTaskNoFilter == null ? this.maxTrpPlanTaskNoFilterEmpty: this.maxTrpPlanTaskNoFilter,
            this.minTrpPlanTaskNoFilter == null ? this.minTrpPlanTaskNoFilterEmpty: this.minTrpPlanTaskNoFilter,
            this.maxTripPlanedIDFilter == null ? this.maxTripPlanedIDFilterEmpty: this.maxTripPlanedIDFilter,
            this.minTripPlanedIDFilter == null ? this.minTripPlanedIDFilterEmpty: this.minTripPlanedIDFilter,
            this.maxDriverIDPPlanedFilter == null ? this.maxDriverIDPPlanedFilterEmpty: this.maxDriverIDPPlanedFilter,
            this.minDriverIDPPlanedFilter == null ? this.minDriverIDPPlanedFilterEmpty: this.minDriverIDPPlanedFilter,
            this.maxBUSIDPlanlnedFilter == null ? this.maxBUSIDPlanlnedFilterEmpty: this.maxBUSIDPlanlnedFilter,
            this.minBUSIDPlanlnedFilter == null ? this.minBUSIDPlanlnedFilterEmpty: this.minBUSIDPlanlnedFilter,
            this.trpPlanISValidFilter,
            this.trpPlanEndTimeFilter,
            this.maxTrpPlanRouteIDFilter == null ? this.maxTrpPlanRouteIDFilterEmpty: this.maxTrpPlanRouteIDFilter,
            this.minTrpPlanRouteIDFilter == null ? this.minTrpPlanRouteIDFilterEmpty: this.minTrpPlanRouteIDFilter,
            this.maxCalenderIDFilter == null ? this.maxCalenderIDFilterEmpty: this.maxCalenderIDFilter,
            this.minCalenderIDFilter == null ? this.minCalenderIDFilterEmpty: this.minCalenderIDFilter,
            this.maxViwTripPlanedDailyFilter == null ? this.maxViwTripPlanedDailyFilterEmpty: this.maxViwTripPlanedDailyFilter,
            this.minViwTripPlanedDailyFilter == null ? this.minViwTripPlanedDailyFilterEmpty: this.minViwTripPlanedDailyFilter,
            this.catSedorFilter,
            this.notesFilter,
            this.busGroupFilter,
            this.maxDriverFilter == null ? this.maxDriverFilterEmpty: this.maxDriverFilter,
            this.minDriverFilter == null ? this.minDriverFilterEmpty: this.minDriverFilter,
            this.maxBusIDFilter == null ? this.maxBusIDFilterEmpty: this.maxBusIDFilter,
            this.minBusIDFilter == null ? this.minBusIDFilterEmpty: this.minBusIDFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
