import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripByMinistriesServiceProxy, TripByMinistryDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditTripByMinistryModalComponent } from './create-or-edit-tripByMinistry-modal.component';
import { ViewTripByMinistryModalComponent } from './view-tripByMinistry-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { EntityTypeHistoryModalComponent } from '@app/shared/common/entityHistory/entity-type-history-modal.component';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './tripByMinistries.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class TripByMinistriesComponent extends AppComponentBase {

    @ViewChild('createOrEditTripByMinistryModal',{static: true}) createOrEditTripByMinistryModal: CreateOrEditTripByMinistryModalComponent;
    @ViewChild('viewTripByMinistryModalComponent',{static: true}) viewTripByMinistryModal: ViewTripByMinistryModalComponent;
    @ViewChild('entityTypeHistoryModal',{static: true}) entityTypeHistoryModal: EntityTypeHistoryModalComponent;
    @ViewChild('dataTable',{static: true}) dataTable: Table;
    @ViewChild('paginator',{static: true}) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxTimeSpanFilter : moment.Moment;
		minTimeSpanFilter : moment.Moment;
    maxTimeSpanEndFilter : moment.Moment;
		minTimeSpanEndFilter : moment.Moment;
        routeLineNumberFilter = '';
        calenderBusTenantIdFilter = '';


    _entityTypeFullName = 'BringitPal.POPBUS.Trips.TripByMinistry';
    entityHistoryEnabled = false;

    constructor(
        injector: Injector,
        private _tripByMinistriesServiceProxy: TripByMinistriesServiceProxy,
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

    getTripByMinistries(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._tripByMinistriesServiceProxy.getAll(
            this.filterText,
            this.maxTimeSpanFilter,
            this.minTimeSpanFilter,
            this.maxTimeSpanEndFilter,
            this.minTimeSpanEndFilter,
            this.routeLineNumberFilter,
            this.calenderBusTenantIdFilter,
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

    createTripByMinistry(): void {
        this.createOrEditTripByMinistryModal.show();
    }

    showHistory(tripByMinistry: TripByMinistryDto): void {
        this.entityTypeHistoryModal.show({
            entityId: tripByMinistry.id.toString(),
            entityTypeFullName: this._entityTypeFullName,
            entityTypeDescription: ''
        });
    }

    deleteTripByMinistry(tripByMinistry: TripByMinistryDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._tripByMinistriesServiceProxy.delete(tripByMinistry.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._tripByMinistriesServiceProxy.getTripByMinistriesToExcel(
        this.filterText,
            this.maxTimeSpanFilter,
            this.minTimeSpanFilter,
            this.maxTimeSpanEndFilter,
            this.minTimeSpanEndFilter,
            this.routeLineNumberFilter,
            this.calenderBusTenantIdFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
