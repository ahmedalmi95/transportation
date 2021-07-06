import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusInfosServiceProxy, BusInfoDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditBusInfoModalComponent } from './create-or-edit-busInfo-modal.component';
import { ViewBusInfoModalComponent } from './view-busInfo-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { EntityTypeHistoryModalComponent } from '@app/shared/common/entityHistory/entity-type-history-modal.component';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './busInfos.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class BusInfosComponent extends AppComponentBase {

    @ViewChild('createOrEditBusInfoModal', {static: true}) createOrEditBusInfoModal: CreateOrEditBusInfoModalComponent;
    @ViewChild('viewBusInfoModalComponent', {static: true}) viewBusInfoModal: ViewBusInfoModalComponent;
    @ViewChild('entityTypeHistoryModal', {static: true}) entityTypeHistoryModal: EntityTypeHistoryModalComponent;
    @ViewChild('dataTable', {static: true}) dataTable: Table;
    @ViewChild('paginator', {static: true}) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    busNumberFilter = '';
    busModelFilter = '';
    modelFilter = '';
    chassisNumberFilter = '';
    trackerIEMIFilter = '';
    maxInsuPolicyNumberFilter : moment.Moment;
		minInsuPolicyNumberFilter : moment.Moment;
    maxCapcityFilter : number;
		maxCapcityFilterEmpty : number;
		minCapcityFilter : number;
		minCapcityFilterEmpty : number;


    _entityTypeFullName = 'BringitPal.POPBUS.Management.BusInfo';
    entityHistoryEnabled = false;

    constructor(
        injector: Injector,
        private _busInfosServiceProxy: BusInfosServiceProxy,
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

    getBusInfos(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._busInfosServiceProxy.getAll(
            this.filterText,
            this.busNumberFilter,
            this.busModelFilter,
            this.modelFilter,
            this.chassisNumberFilter,
            this.trackerIEMIFilter,
            this.maxInsuPolicyNumberFilter,
            this.minInsuPolicyNumberFilter,
            this.maxCapcityFilter == null ? this.maxCapcityFilterEmpty: this.maxCapcityFilter,
            this.minCapcityFilter == null ? this.minCapcityFilterEmpty: this.minCapcityFilter,
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

    createBusInfo(): void {
        this.createOrEditBusInfoModal.show();
    }

    showHistory(busInfo: BusInfoDto): void {
        this.entityTypeHistoryModal.show({
            entityId: busInfo.id.toString(),
            entityTypeFullName: this._entityTypeFullName,
            entityTypeDescription: ''
        });
    }

    deleteBusInfo(busInfo: BusInfoDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._busInfosServiceProxy.delete(busInfo.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._busInfosServiceProxy.getBusInfosToExcel(
        this.filterText,
            this.busNumberFilter,
            this.busModelFilter,
            this.modelFilter,
            this.chassisNumberFilter,
            this.trackerIEMIFilter,
            this.maxInsuPolicyNumberFilter,
            this.minInsuPolicyNumberFilter,
            this.maxCapcityFilter == null ? this.maxCapcityFilterEmpty: this.maxCapcityFilter,
            this.minCapcityFilter == null ? this.minCapcityFilterEmpty: this.minCapcityFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
