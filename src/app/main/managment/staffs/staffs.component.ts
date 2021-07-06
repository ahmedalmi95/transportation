import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaffsServiceProxy, StaffDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditStaffModalComponent } from './create-or-edit-staff-modal.component';
import { ViewStaffModalComponent } from './view-staff-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { EntityTypeHistoryModalComponent } from '@app/shared/common/entityHistory/entity-type-history-modal.component';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './staffs.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class StaffsComponent extends AppComponentBase {

    @ViewChild('createOrEditStaffModal', {static: true}) createOrEditStaffModal: CreateOrEditStaffModalComponent;
    @ViewChild('viewStaffModalComponent', {static: true}) viewStaffModal: ViewStaffModalComponent;
    @ViewChild('entityTypeHistoryModal', {static: true}) entityTypeHistoryModal: EntityTypeHistoryModalComponent;
    @ViewChild('dataTable', {static: true}) dataTable: Table;
    @ViewChild('paginator', {static: true}) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    fulL_NAMEFilter = '';
    genderFilter = '';
    workMobileFilter = '';
    jobTitleFilter = '';
    professionFilter = '';
    phoneFilter = '';
    mobileFilter = '';
    posistionFilter = '';
    employmenT_TYPEFilter = '';
    maxPROJECT_IDFilter : number;
		maxPROJECT_IDFilterEmpty : number;
		minPROJECT_IDFilter : number;
		minPROJECT_IDFilterEmpty : number;
    maxDOBFilter : moment.Moment;
		minDOBFilter : moment.Moment;
    maxDOEFilter : moment.Moment;
		minDOEFilter : moment.Moment;
    logiN_NAMEFilter = '';
    logiN_PASSFilter = '';
    iS_ACTIVEFilter = -1;
    rolesFilter = '';
    emailFilter = '';
    skypeFilter = '';
    personalIMFilter = '';
    homeFaxFilter = '';
    homePhoneFilter = '';
    addressFilter = '';
    postalCodeFilter = '';
    workExtensionFilter = '';
    maxlastUpdatedFilter : moment.Moment;
		minlastUpdatedFilter : moment.Moment;
    maxEmployeestartDateFilter : moment.Moment;
		minEmployeestartDateFilter : moment.Moment;
    maxCostFilter : number;
		maxCostFilterEmpty : number;
		minCostFilter : number;
		minCostFilterEmpty : number;
    maxTimsheetCheckByEmpFilter : number;
		maxTimsheetCheckByEmpFilterEmpty : number;
		minTimsheetCheckByEmpFilter : number;
		minTimsheetCheckByEmpFilterEmpty : number;
    maxautoranIDFilter : number;
		maxautoranIDFilterEmpty : number;
		minautoranIDFilter : number;
		minautoranIDFilterEmpty : number;
    isDriverFilter = -1;
    maxXFilter : number;
		maxXFilterEmpty : number;
		minXFilter : number;
		minXFilterEmpty : number;
    maxYFilter : number;
		maxYFilterEmpty : number;
		minYFilter : number;
		minYFilterEmpty : number;
    dayFilter = '';
    maxDisplayOrderFilter : number;
		maxDisplayOrderFilterEmpty : number;
		minDisplayOrderFilter : number;
		minDisplayOrderFilterEmpty : number;
    isStopFilter = -1;
    maxautoranIDServerFilter : number;
		maxautoranIDServerFilterEmpty : number;
		minautoranIDServerFilter : number;
		minautoranIDServerFilterEmpty : number;
    idNumberFilter = '';
    klushNoFilter = '';
    maxwelfareClockIdFilter : number;
		maxwelfareClockIdFilterEmpty : number;
		minwelfareClockIdFilter : number;
		minwelfareClockIdFilterEmpty : number;
        departmentDepartmentNameFilter = '';
        organizationUnitDisplayNameFilter = '';
        staffFULL_NAMEFilter = '';


    _entityTypeFullName = 'BringitPal.POPBUS.Managment.Staff';
    entityHistoryEnabled = false;

    constructor(
        injector: Injector,
        private _staffsServiceProxy: StaffsServiceProxy,
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

    getStaffs(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._staffsServiceProxy.getAll(
            this.filterText,
            this.fulL_NAMEFilter,
            this.genderFilter,
            this.workMobileFilter,
            this.jobTitleFilter,
            this.professionFilter,
            this.phoneFilter,
            this.mobileFilter,
            this.posistionFilter,
            this.employmenT_TYPEFilter,
            this.maxPROJECT_IDFilter == null ? this.maxPROJECT_IDFilterEmpty: this.maxPROJECT_IDFilter,
            this.minPROJECT_IDFilter == null ? this.minPROJECT_IDFilterEmpty: this.minPROJECT_IDFilter,
            this.maxDOBFilter,
            this.minDOBFilter,
            this.maxDOEFilter,
            this.minDOEFilter,
            this.logiN_NAMEFilter,
            this.logiN_PASSFilter,
            this.iS_ACTIVEFilter,
            this.rolesFilter,
            this.emailFilter,
            this.skypeFilter,
            this.personalIMFilter,
            this.homeFaxFilter,
            this.homePhoneFilter,
            this.addressFilter,
            this.postalCodeFilter,
            this.workExtensionFilter,
            this.maxlastUpdatedFilter,
            this.minlastUpdatedFilter,
            this.maxEmployeestartDateFilter,
            this.minEmployeestartDateFilter,
            this.maxCostFilter == null ? this.maxCostFilterEmpty: this.maxCostFilter,
            this.minCostFilter == null ? this.minCostFilterEmpty: this.minCostFilter,
            this.maxTimsheetCheckByEmpFilter == null ? this.maxTimsheetCheckByEmpFilterEmpty: this.maxTimsheetCheckByEmpFilter,
            this.minTimsheetCheckByEmpFilter == null ? this.minTimsheetCheckByEmpFilterEmpty: this.minTimsheetCheckByEmpFilter,
            this.maxautoranIDFilter == null ? this.maxautoranIDFilterEmpty: this.maxautoranIDFilter,
            this.minautoranIDFilter == null ? this.minautoranIDFilterEmpty: this.minautoranIDFilter,
            this.isDriverFilter,
            this.maxXFilter == null ? this.maxXFilterEmpty: this.maxXFilter,
            this.minXFilter == null ? this.minXFilterEmpty: this.minXFilter,
            this.maxYFilter == null ? this.maxYFilterEmpty: this.maxYFilter,
            this.minYFilter == null ? this.minYFilterEmpty: this.minYFilter,
            this.dayFilter,
            this.maxDisplayOrderFilter == null ? this.maxDisplayOrderFilterEmpty: this.maxDisplayOrderFilter,
            this.minDisplayOrderFilter == null ? this.minDisplayOrderFilterEmpty: this.minDisplayOrderFilter,
            this.isStopFilter,
            this.maxautoranIDServerFilter == null ? this.maxautoranIDServerFilterEmpty: this.maxautoranIDServerFilter,
            this.minautoranIDServerFilter == null ? this.minautoranIDServerFilterEmpty: this.minautoranIDServerFilter,
            this.idNumberFilter,
            this.klushNoFilter,
            this.maxwelfareClockIdFilter == null ? this.maxwelfareClockIdFilterEmpty: this.maxwelfareClockIdFilter,
            this.minwelfareClockIdFilter == null ? this.minwelfareClockIdFilterEmpty: this.minwelfareClockIdFilter,
            this.departmentDepartmentNameFilter,
            this.organizationUnitDisplayNameFilter,
            this.staffFULL_NAMEFilter,
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

    createStaff(): void {
        this.createOrEditStaffModal.show();
    }

    showHistory(staff: StaffDto): void {
        this.entityTypeHistoryModal.show({
            entityId: staff.id.toString(),
            entityTypeFullName: this._entityTypeFullName,
            entityTypeDescription: ''
        });
    }

    deleteStaff(staff: StaffDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._staffsServiceProxy.delete(staff.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._staffsServiceProxy.getStaffsToExcel(
        this.filterText,
            this.fulL_NAMEFilter,
            this.genderFilter,
            this.workMobileFilter,
            this.jobTitleFilter,
            this.professionFilter,
            this.phoneFilter,
            this.mobileFilter,
            this.posistionFilter,
            this.employmenT_TYPEFilter,
            this.maxPROJECT_IDFilter == null ? this.maxPROJECT_IDFilterEmpty: this.maxPROJECT_IDFilter,
            this.minPROJECT_IDFilter == null ? this.minPROJECT_IDFilterEmpty: this.minPROJECT_IDFilter,
            this.maxDOBFilter,
            this.minDOBFilter,
            this.maxDOEFilter,
            this.minDOEFilter,
            this.logiN_NAMEFilter,
            this.logiN_PASSFilter,
            this.iS_ACTIVEFilter,
            this.rolesFilter,
            this.emailFilter,
            this.skypeFilter,
            this.personalIMFilter,
            this.homeFaxFilter,
            this.homePhoneFilter,
            this.addressFilter,
            this.postalCodeFilter,
            this.workExtensionFilter,
            this.maxlastUpdatedFilter,
            this.minlastUpdatedFilter,
            this.maxEmployeestartDateFilter,
            this.minEmployeestartDateFilter,
            this.maxCostFilter == null ? this.maxCostFilterEmpty: this.maxCostFilter,
            this.minCostFilter == null ? this.minCostFilterEmpty: this.minCostFilter,
            this.maxTimsheetCheckByEmpFilter == null ? this.maxTimsheetCheckByEmpFilterEmpty: this.maxTimsheetCheckByEmpFilter,
            this.minTimsheetCheckByEmpFilter == null ? this.minTimsheetCheckByEmpFilterEmpty: this.minTimsheetCheckByEmpFilter,
            this.maxautoranIDFilter == null ? this.maxautoranIDFilterEmpty: this.maxautoranIDFilter,
            this.minautoranIDFilter == null ? this.minautoranIDFilterEmpty: this.minautoranIDFilter,
            this.isDriverFilter,
            this.maxXFilter == null ? this.maxXFilterEmpty: this.maxXFilter,
            this.minXFilter == null ? this.minXFilterEmpty: this.minXFilter,
            this.maxYFilter == null ? this.maxYFilterEmpty: this.maxYFilter,
            this.minYFilter == null ? this.minYFilterEmpty: this.minYFilter,
            this.dayFilter,
            this.maxDisplayOrderFilter == null ? this.maxDisplayOrderFilterEmpty: this.maxDisplayOrderFilter,
            this.minDisplayOrderFilter == null ? this.minDisplayOrderFilterEmpty: this.minDisplayOrderFilter,
            this.isStopFilter,
            this.maxautoranIDServerFilter == null ? this.maxautoranIDServerFilterEmpty: this.maxautoranIDServerFilter,
            this.minautoranIDServerFilter == null ? this.minautoranIDServerFilterEmpty: this.minautoranIDServerFilter,
            this.idNumberFilter,
            this.klushNoFilter,
            this.maxwelfareClockIdFilter == null ? this.maxwelfareClockIdFilterEmpty: this.maxwelfareClockIdFilter,
            this.minwelfareClockIdFilter == null ? this.minwelfareClockIdFilterEmpty: this.minwelfareClockIdFilter,
            this.departmentDepartmentNameFilter,
            this.organizationUnitDisplayNameFilter,
            this.staffFULL_NAMEFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
