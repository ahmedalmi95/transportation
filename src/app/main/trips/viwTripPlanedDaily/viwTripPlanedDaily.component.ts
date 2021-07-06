import {Component, Injector, ViewEncapsulation, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
    ViwTripPlanedDailyServiceProxy,
    ViwTripPlanedDailyDto,
    // ReplaceViwTripPlanedDailyDto
} from '@shared/service-proxies/service-proxies';
import {NotifyService} from '@abp/notify/notify.service';
import {AppComponentBase} from '@shared/common/app-component-base';
import {TokenAuthServiceProxy} from '@shared/service-proxies/service-proxies';
import {CreateOrEditViwTripPlanedDailyModalComponent} from './create-or-edit-viwTripPlanedDaily-modal.component';
import {ReplaceTripPlanedDailyModalComponent} from './replace-viwTripPlanedDaily-modal.component';
import {ViewViwTripPlanedDailyModalComponent} from './view-viwTripPlanedDaily-modal.component';
import {appModuleAnimation} from '@shared/animations/routerTransition';
import {Table} from 'primeng/components/table/table';
import {Paginator} from 'primeng/components/paginator/paginator';
import {LazyLoadEvent} from 'primeng/components/common/lazyloadevent';
import {FileDownloadService} from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './viwTripPlanedDaily.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class ViwTripPlanedDailyComponent extends AppComponentBase {

    @ViewChild('createOrEditViwTripPlanedDailyModal', {static: true}) createOrEditViwTripPlanedDailyModal: CreateOrEditViwTripPlanedDailyModalComponent;
    @ViewChild('replaceViwTripPlanedDailyModal', {static: true}) replaceViwTripPlanedDailyModal: ReplaceTripPlanedDailyModalComponent;
    @ViewChild('viewViwTripPlanedDailyModalComponent', {static: true}) viewViwTripPlanedDailyModal: ViewViwTripPlanedDailyModalComponent;
    @ViewChild('dataTable', {static: true}) dataTable: Table;
    @ViewChild('paginator', {static: true}) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    tripIDGTFSFilter = '';
    trpPlanBusNumberFilter = '';
    maxTrpPlanCalnderIDFilter: number;
    maxTrpPlanCalnderIDFilterEmpty: number;
    minTrpPlanCalnderIDFilter: number;
    minTrpPlanCalnderIDFilterEmpty: number;
    trpPlanStartTimeFilter = '';
    maxTrpPlanLineNumberFilter: number;
    maxTrpPlanLineNumberFilterEmpty: number;
    minTrpPlanLineNumberFilter: number;
    minTrpPlanLineNumberFilterEmpty: number;
    maxTrpPlanDirectionFilter: number;
    maxTrpPlanDirectionFilterEmpty: number;
    minTrpPlanDirectionFilter: number;
    minTrpPlanDirectionFilterEmpty: number;
    trpPlanDriverNameFilter = '';
    maxTripMinistryIDFilter: number;
    maxTripMinistryIDFilterEmpty: number;
    minTripMinistryIDFilter: number;
    minTripMinistryIDFilterEmpty: number;
    maxTripMinistryLineNumberFilter: number;
    maxTripMinistryLineNumberFilterEmpty: number;
    minTripMinistryLineNumberFilter: number;
    minTripMinistryLineNumberFilterEmpty: number;
    maxTripMinistryDirectionFilter: number;
    maxTripMinistryDirectionFilterEmpty: number;
    minTripMinistryDirectionFilter: number;
    minTripMinistryDirectionFilterEmpty: number;
    maxTripMinistryCalenderIDFilter: number;
    maxTripMinistryCalenderIDFilterEmpty: number;
    minTripMinistryCalenderIDFilter: number;
    minTripMinistryCalenderIDFilterEmpty: number;
    tripMinistryTimeSpanFilter = '';
    tripMinistryMondayFilter = -1;
    tripMinistryTuesdayFilter = -1;
    tripMinistryWensdayFilter = -1;
    tripMinistryFridayFilter = -1;
    tripMinistryThursdayFilter = -1;
    tripMinistrySaturdayFilter = -1;
    tripMinistrySundayFilter = -1;
    maxTripMinistryStart_dateFilter: moment.Moment;
    minTripMinistryStart_dateFilter: moment.Moment;
    maxTripMinistryRouteIDFilter: number;
    maxTripMinistryRouteIDFilterEmpty: number;
    minTripMinistryRouteIDFilter: number;
    minTripMinistryRouteIDFilterEmpty: number;
    trpPlanmondayFilter = -1;
    trpPlanTuesdayFilter = -1;
    trpPlanWensdayFilter = -1;
    trpPlanthursdayFilter = -1;
    trpPlanfridayFilter = -1;
    trpPlansaturdayFilter = -1;
    trpPlansundayFilter = -1;
    maxTrpPlanStart_dateFilter: moment.Moment;
    minTrpPlanStart_dateFilter: moment.Moment;
    maxTrpPlanEnd_dateFilter: moment.Moment;
    minTrpPlanEnd_dateFilter: moment.Moment;
    maxTrpPlanTaskNoFilter: number;
    maxTrpPlanTaskNoFilterEmpty: number;
    minTrpPlanTaskNoFilter: number;
    minTrpPlanTaskNoFilterEmpty: number;
    maxTripPlanedIDFilter: number;
    maxTripPlanedIDFilterEmpty: number;
    minTripPlanedIDFilter: number;
    minTripPlanedIDFilterEmpty: number;
    maxDriverIDPPlanedFilter: number;
    maxDriverIDPPlanedFilterEmpty: number;
    minDriverIDPPlanedFilter: number;
    minDriverIDPPlanedFilterEmpty: number;
    maxBUSIDPlanlnedFilter: number;
    maxBUSIDPlanlnedFilterEmpty: number;
    minBUSIDPlanlnedFilter: number;
    minBUSIDPlanlnedFilterEmpty: number;
    trpPlanISValidFilter = -1;
    trpPlanEndTimeFilter = '';
    maxTrpPlanRouteIDFilter: number;
    maxTrpPlanRouteIDFilterEmpty: number;
    minTrpPlanRouteIDFilter: number;
    minTrpPlanRouteIDFilterEmpty: number;
    maxWorkingdayFilter: moment.Moment;
    minWorkingdayFilter: moment.Moment;
    maxAutranFilter: number;
    maxAutranFilterEmpty: number;
    minAutranFilter: number;
    minAutranFilterEmpty: number;
    startLocationNameFilter = '';
    startLocationNameHebFilter = '';
    maxStartLocationCodeFilter: number;
    maxStartLocationCodeFilterEmpty: number;
    minStartLocationCodeFilter: number;
    minStartLocationCodeFilterEmpty: number;
    maxStartLocationLatitudeFilter: number;
    maxStartLocationLatitudeFilterEmpty: number;
    minStartLocationLatitudeFilter: number;
    minStartLocationLatitudeFilterEmpty: number;
    maxStartLocationLongitudeFilter: number;
    maxStartLocationLongitudeFilterEmpty: number;
    minStartLocationLongitudeFilter: number;
    minStartLocationLongitudeFilterEmpty: number;
    maxRouteTotalKMFilter: number;
    maxRouteTotalKMFilterEmpty: number;
    minRouteTotalKMFilter: number;
    minRouteTotalKMFilterEmpty: number;
    maxRouteTotalMinutesFilter: number;
    maxRouteTotalMinutesFilterEmpty: number;
    minRouteTotalMinutesFilter: number;
    minRouteTotalMinutesFilterEmpty: number;
    isMinistryFilter = '';
    maxBusIDFilter: number;
    maxBusIDFilterEmpty: number;
    minBusIDFilter: number;
    minBusIDFilterEmpty: number;
    routeIDGTFSFilter = '';
    controlStartTimeFilter = '';

 tripTypesNameFilter = '';
    busGroupFilter = '';

  maxDriverOrginalFilter : number;
		maxDriverOrginalFilterEmpty : number;
		minDriverOrginalFilter : number;
		minDriverOrginalFilterEmpty : number;
    maxBusOrginalFilter : number;
		maxBusOrginalFilterEmpty : number;
		minBusOrginalFilter : number;
		minBusOrginalFilterEmpty : number;
    endLocationNameFilter = '';
    endLocationNameHebrewFilter = '';
    maxEndStationCodeFilter : number;
		maxEndStationCodeFilterEmpty : number;
		minEndStationCodeFilter : number;
		minEndStationCodeFilterEmpty : number;
    maxEndLatitudeFilter : number;
		maxEndLatitudeFilterEmpty : number;
		minEndLatitudeFilter : number;
		minEndLatitudeFilterEmpty : number;
    maxEndLongitudeFilter : number;
		maxEndLongitudeFilterEmpty : number;
		minEndLongitudeFilter : number;
		minEndLongitudeFilterEmpty : number;
    maxTripPlannedWothDriverIDFilter : number;
		maxTripPlannedWothDriverIDFilterEmpty : number;
		minTripPlannedWothDriverIDFilter : number;
		minTripPlannedWothDriverIDFilterEmpty : number;
        showBy = 3;


    constructor(
        injector: Injector,
        private _viwTripPlanedDailyServiceProxy: ViwTripPlanedDailyServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getViwTripPlanedDaily(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();
        
        this._viwTripPlanedDailyServiceProxy.getAll(
             this.filterText,
            this.tripIDGTFSFilter,
            this.trpPlanBusNumberFilter,
            this.maxTrpPlanCalnderIDFilter == null ? this.maxTrpPlanCalnderIDFilterEmpty: this.maxTrpPlanCalnderIDFilter,
            this.minTrpPlanCalnderIDFilter == null ? this.minTrpPlanCalnderIDFilterEmpty: this.minTrpPlanCalnderIDFilter,
            this.trpPlanStartTimeFilter,
            this.maxTrpPlanLineNumberFilter == null ? this.maxTrpPlanLineNumberFilterEmpty: this.maxTrpPlanLineNumberFilter,
            this.minTrpPlanLineNumberFilter == null ? this.minTrpPlanLineNumberFilterEmpty: this.minTrpPlanLineNumberFilter,
            this.maxTrpPlanDirectionFilter == null ? this.maxTrpPlanDirectionFilterEmpty: this.maxTrpPlanDirectionFilter,
            this.minTrpPlanDirectionFilter == null ? this.minTrpPlanDirectionFilterEmpty: this.minTrpPlanDirectionFilter,
            this.trpPlanDriverNameFilter,
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
            this.maxWorkingdayFilter,
            this.minWorkingdayFilter,
            this.maxAutranFilter == null ? this.maxAutranFilterEmpty: this.maxAutranFilter,
            this.minAutranFilter == null ? this.minAutranFilterEmpty: this.minAutranFilter,
            this.startLocationNameFilter,
            this.startLocationNameHebFilter,
            this.maxStartLocationCodeFilter == null ? this.maxStartLocationCodeFilterEmpty: this.maxStartLocationCodeFilter,
            this.minStartLocationCodeFilter == null ? this.minStartLocationCodeFilterEmpty: this.minStartLocationCodeFilter,
            this.maxStartLocationLatitudeFilter == null ? this.maxStartLocationLatitudeFilterEmpty: this.maxStartLocationLatitudeFilter,
            this.minStartLocationLatitudeFilter == null ? this.minStartLocationLatitudeFilterEmpty: this.minStartLocationLatitudeFilter,
            this.maxStartLocationLongitudeFilter == null ? this.maxStartLocationLongitudeFilterEmpty: this.maxStartLocationLongitudeFilter,
            this.minStartLocationLongitudeFilter == null ? this.minStartLocationLongitudeFilterEmpty: this.minStartLocationLongitudeFilter,
            this.maxRouteTotalKMFilter == null ? this.maxRouteTotalKMFilterEmpty: this.maxRouteTotalKMFilter,
            this.minRouteTotalKMFilter == null ? this.minRouteTotalKMFilterEmpty: this.minRouteTotalKMFilter,
            this.maxRouteTotalMinutesFilter == null ? this.maxRouteTotalMinutesFilterEmpty: this.maxRouteTotalMinutesFilter,
            this.minRouteTotalMinutesFilter == null ? this.minRouteTotalMinutesFilterEmpty: this.minRouteTotalMinutesFilter,
            this.isMinistryFilter,
            this.maxBusIDFilter == null ? this.maxBusIDFilterEmpty: this.maxBusIDFilter,
            this.minBusIDFilter == null ? this.minBusIDFilterEmpty: this.minBusIDFilter,
            this.routeIDGTFSFilter,
            this.controlStartTimeFilter,
            this.tripTypesNameFilter,
            this.busGroupFilter,
            this.maxDriverOrginalFilter == null ? this.maxDriverOrginalFilterEmpty: this.maxDriverOrginalFilter,
            this.minDriverOrginalFilter == null ? this.minDriverOrginalFilterEmpty: this.minDriverOrginalFilter,
            this.maxBusOrginalFilter == null ? this.maxBusOrginalFilterEmpty: this.maxBusOrginalFilter,
            this.minBusOrginalFilter == null ? this.minBusOrginalFilterEmpty: this.minBusOrginalFilter,
            this.endLocationNameFilter,
            this.endLocationNameHebrewFilter,
            this.maxEndStationCodeFilter == null ? this.maxEndStationCodeFilterEmpty: this.maxEndStationCodeFilter,
            this.minEndStationCodeFilter == null ? this.minEndStationCodeFilterEmpty: this.minEndStationCodeFilter,
            this.maxEndLatitudeFilter == null ? this.maxEndLatitudeFilterEmpty: this.maxEndLatitudeFilter,
            this.minEndLatitudeFilter == null ? this.minEndLatitudeFilterEmpty: this.minEndLatitudeFilter,
            this.maxEndLongitudeFilter == null ? this.maxEndLongitudeFilterEmpty: this.maxEndLongitudeFilter,
            this.minEndLongitudeFilter == null ? this.minEndLongitudeFilterEmpty: this.minEndLongitudeFilter,
            this.maxTripPlannedWothDriverIDFilter == null ? this.maxTripPlannedWothDriverIDFilterEmpty: this.maxTripPlannedWothDriverIDFilter,
            this.minTripPlannedWothDriverIDFilter == null ? this.minTripPlannedWothDriverIDFilterEmpty: this.minTripPlannedWothDriverIDFilter,
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

    createViwTripPlanedDaily(): void {
        this.createOrEditViwTripPlanedDailyModal.show();
    }

    replcaViwTripPlanedDaily(): void {
        this.replaceViwTripPlanedDailyModal.show();
    }

    deleteViwTripPlanedDaily(viwTripPlanedDaily: ViwTripPlanedDailyDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._viwTripPlanedDailyServiceProxy.delete(viwTripPlanedDaily.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
         this._viwTripPlanedDailyServiceProxy.getViwTripPlanedDailyToExcel(
        this.filterText,
            this.tripIDGTFSFilter,
            this.trpPlanBusNumberFilter,
            this.maxTrpPlanCalnderIDFilter == null ? this.maxTrpPlanCalnderIDFilterEmpty: this.maxTrpPlanCalnderIDFilter,
            this.minTrpPlanCalnderIDFilter == null ? this.minTrpPlanCalnderIDFilterEmpty: this.minTrpPlanCalnderIDFilter,
            this.trpPlanStartTimeFilter,
            this.maxTrpPlanLineNumberFilter == null ? this.maxTrpPlanLineNumberFilterEmpty: this.maxTrpPlanLineNumberFilter,
            this.minTrpPlanLineNumberFilter == null ? this.minTrpPlanLineNumberFilterEmpty: this.minTrpPlanLineNumberFilter,
            this.maxTrpPlanDirectionFilter == null ? this.maxTrpPlanDirectionFilterEmpty: this.maxTrpPlanDirectionFilter,
            this.minTrpPlanDirectionFilter == null ? this.minTrpPlanDirectionFilterEmpty: this.minTrpPlanDirectionFilter,
            this.trpPlanDriverNameFilter,
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
            this.maxWorkingdayFilter,
            this.minWorkingdayFilter,
            this.maxAutranFilter == null ? this.maxAutranFilterEmpty: this.maxAutranFilter,
            this.minAutranFilter == null ? this.minAutranFilterEmpty: this.minAutranFilter,
            this.startLocationNameFilter,
            this.startLocationNameHebFilter,
            this.maxStartLocationCodeFilter == null ? this.maxStartLocationCodeFilterEmpty: this.maxStartLocationCodeFilter,
            this.minStartLocationCodeFilter == null ? this.minStartLocationCodeFilterEmpty: this.minStartLocationCodeFilter,
            this.maxStartLocationLatitudeFilter == null ? this.maxStartLocationLatitudeFilterEmpty: this.maxStartLocationLatitudeFilter,
            this.minStartLocationLatitudeFilter == null ? this.minStartLocationLatitudeFilterEmpty: this.minStartLocationLatitudeFilter,
            this.maxStartLocationLongitudeFilter == null ? this.maxStartLocationLongitudeFilterEmpty: this.maxStartLocationLongitudeFilter,
            this.minStartLocationLongitudeFilter == null ? this.minStartLocationLongitudeFilterEmpty: this.minStartLocationLongitudeFilter,
            this.maxRouteTotalKMFilter == null ? this.maxRouteTotalKMFilterEmpty: this.maxRouteTotalKMFilter,
            this.minRouteTotalKMFilter == null ? this.minRouteTotalKMFilterEmpty: this.minRouteTotalKMFilter,
            this.maxRouteTotalMinutesFilter == null ? this.maxRouteTotalMinutesFilterEmpty: this.maxRouteTotalMinutesFilter,
            this.minRouteTotalMinutesFilter == null ? this.minRouteTotalMinutesFilterEmpty: this.minRouteTotalMinutesFilter,
            this.isMinistryFilter,
            this.maxBusIDFilter == null ? this.maxBusIDFilterEmpty: this.maxBusIDFilter,
            this.minBusIDFilter == null ? this.minBusIDFilterEmpty: this.minBusIDFilter,
            this.routeIDGTFSFilter,
            this.controlStartTimeFilter,
            this.tripTypesNameFilter,
            this.busGroupFilter,
            this.maxDriverOrginalFilter == null ? this.maxDriverOrginalFilterEmpty: this.maxDriverOrginalFilter,
            this.minDriverOrginalFilter == null ? this.minDriverOrginalFilterEmpty: this.minDriverOrginalFilter,
            this.maxBusOrginalFilter == null ? this.maxBusOrginalFilterEmpty: this.maxBusOrginalFilter,
            this.minBusOrginalFilter == null ? this.minBusOrginalFilterEmpty: this.minBusOrginalFilter,
            this.endLocationNameFilter,
            this.endLocationNameHebrewFilter,
            this.maxEndStationCodeFilter == null ? this.maxEndStationCodeFilterEmpty: this.maxEndStationCodeFilter,
            this.minEndStationCodeFilter == null ? this.minEndStationCodeFilterEmpty: this.minEndStationCodeFilter,
            this.maxEndLatitudeFilter == null ? this.maxEndLatitudeFilterEmpty: this.maxEndLatitudeFilter,
            this.minEndLatitudeFilter == null ? this.minEndLatitudeFilterEmpty: this.minEndLatitudeFilter,
            this.maxEndLongitudeFilter == null ? this.maxEndLongitudeFilterEmpty: this.maxEndLongitudeFilter,
            this.minEndLongitudeFilter == null ? this.minEndLongitudeFilterEmpty: this.minEndLongitudeFilter,
            this.maxTripPlannedWothDriverIDFilter == null ? this.maxTripPlannedWothDriverIDFilterEmpty: this.maxTripPlannedWothDriverIDFilter,
            this.minTripPlannedWothDriverIDFilter == null ? this.minTripPlannedWothDriverIDFilterEmpty: this.minTripPlannedWothDriverIDFilter,

        )
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }
}
