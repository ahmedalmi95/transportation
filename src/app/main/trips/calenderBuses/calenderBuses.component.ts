import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalenderBusesServiceProxy, CalenderBusDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCalenderBusModalComponent } from './create-or-edit-calenderBus-modal.component';
import { ViewCalenderBusModalComponent } from './view-calenderBus-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { EntityTypeHistoryModalComponent } from '@app/shared/common/entityHistory/entity-type-history-modal.component';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './calenderBuses.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class CalenderBusesComponent extends AppComponentBase {

    @ViewChild('createOrEditCalenderBusModal', {static: true}) createOrEditCalenderBusModal: CreateOrEditCalenderBusModalComponent;
    @ViewChild('viewCalenderBusModalComponent', {static: true}) viewCalenderBusModal: ViewCalenderBusModalComponent;
    @ViewChild('entityTypeHistoryModal', {static: true}) entityTypeHistoryModal: EntityTypeHistoryModalComponent;
    @ViewChild('dataTable', {static: true}) dataTable: Table;
    @ViewChild('paginator', {static: true}) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    mondayFilter = -1;
    tuesdayFilter = -1;
    wednesdayFilter = -1;
    thursdayFilter = -1;
    fridayFilter = -1;
    saturdayFilter = -1;
    sundayFilter = -1;
    maxstart_dateFilter : moment.Moment;
		minstart_dateFilter : moment.Moment;
    maxend_dateFilter : moment.Moment;
		minend_dateFilter : moment.Moment;


    _entityTypeFullName = 'BringitPal.POPBUS.Trips.CalenderBus';
    entityHistoryEnabled = false;

    constructor(
        injector: Injector,
        private _calenderBusesServiceProxy: CalenderBusesServiceProxy,
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

    getCalenderBuses(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._calenderBusesServiceProxy.getAll(
            this.filterText,
            this.mondayFilter,
            this.tuesdayFilter,
            this.wednesdayFilter,
            this.thursdayFilter,
            this.fridayFilter,
            this.saturdayFilter,
            this.sundayFilter,
            this.maxstart_dateFilter,
            this.minstart_dateFilter,
            this.maxend_dateFilter,
            this.minend_dateFilter,
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

    createCalenderBus(): void {
        this.createOrEditCalenderBusModal.show();
    }

    showHistory(calenderBus: CalenderBusDto): void {
        this.entityTypeHistoryModal.show({
            entityId: calenderBus.id.toString(),
            entityTypeFullName: this._entityTypeFullName,
            entityTypeDescription: ''
        });
    }

    deleteCalenderBus(calenderBus: CalenderBusDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._calenderBusesServiceProxy.delete(calenderBus.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._calenderBusesServiceProxy.getCalenderBusesToExcel(
        this.filterText,
            this.mondayFilter,
            this.tuesdayFilter,
            this.wednesdayFilter,
            this.thursdayFilter,
            this.fridayFilter,
            this.saturdayFilter,
            this.sundayFilter,
            this.maxstart_dateFilter,
            this.minstart_dateFilter,
            this.maxend_dateFilter,
            this.minend_dateFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
