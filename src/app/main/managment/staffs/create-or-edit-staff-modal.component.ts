import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { StaffsServiceProxy, CreateOrEditStaffDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { DepartmentLookupTableModalComponent } from './department-lookup-table-modal.component';
import { OrganizationUnitLookupTableModalComponent } from './organizationUnit-lookup-table-modal.component';
import { StaffLookupTableModalComponent } from './staff-lookup-table-modal.component';


@Component({
    selector: 'createOrEditStaffModal',
    templateUrl: './create-or-edit-staff-modal.component.html'
})
export class CreateOrEditStaffModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;
    @ViewChild('departmentLookupTableModal', {static: true}) departmentLookupTableModal: DepartmentLookupTableModalComponent;
    @ViewChild('organizationUnitLookupTableModal', {static: true}) organizationUnitLookupTableModal: OrganizationUnitLookupTableModalComponent;
    @ViewChild('staffLookupTableModal', {static: true}) staffLookupTableModal: StaffLookupTableModalComponent;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    staff: CreateOrEditStaffDto = new CreateOrEditStaffDto();

            dob: Date;
            doe: Date;
            lastUpdated: Date;
            employeestartDate: Date;
    departmentDepartmentName = '';
    organizationUnitDisplayName = '';
    staffFULL_NAME = '';


    constructor(
        injector: Injector,
        private _staffsServiceProxy: StaffsServiceProxy
    ) {
        super(injector);
    }

    show(staffId?: number): void {
this.dob = null;
this.doe = null;
this.lastUpdated = null;
this.employeestartDate = null;

        if (!staffId) {
            this.staff = new CreateOrEditStaffDto();
            this.staff.id = staffId;
            this.departmentDepartmentName = '';
            this.organizationUnitDisplayName = '';
            this.staffFULL_NAME = '';

            this.active = true;
            this.modal.show();
        } else {
            this._staffsServiceProxy.getStaffForEdit(staffId).subscribe(result => {
                this.staff = result.staff;

                if (this.staff.dob) {
					this.dob = this.staff.dob.toDate();
                }
                if (this.staff.doe) {
					this.doe = this.staff.doe.toDate();
                }
                if (this.staff.lastUpdated) {
					this.lastUpdated = this.staff.lastUpdated.toDate();
                }
                if (this.staff.employeestartDate) {
					this.employeestartDate = this.staff.employeestartDate.toDate();
                }
                this.departmentDepartmentName = result.departmentDepartmentName;
                this.organizationUnitDisplayName = result.organizationUnitDisplayName;
                this.staffFULL_NAME = result.staffFULL_NAME;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
			
        if (this.dob) {
            if (!this.staff.dob) {
                this.staff.dob = moment(this.dob).startOf('day');
            }
            else {
                this.staff.dob = moment(this.dob);
            }
        }
        else {
            this.staff.dob = null;
        }
        if (this.doe) {
            if (!this.staff.doe) {
                this.staff.doe = moment(this.doe).startOf('day');
            }
            else {
                this.staff.doe = moment(this.doe);
            }
        }
        else {
            this.staff.doe = null;
        }
        if (this.lastUpdated) {
            if (!this.staff.lastUpdated) {
                this.staff.lastUpdated = moment(this.lastUpdated).startOf('day');
            }
            else {
                this.staff.lastUpdated = moment(this.lastUpdated);
            }
        }
        else {
            this.staff.lastUpdated = null;
        }
        if (this.employeestartDate) {
            if (!this.staff.employeestartDate) {
                this.staff.employeestartDate = moment(this.employeestartDate).startOf('day');
            }
            else {
                this.staff.employeestartDate = moment(this.employeestartDate);
            }
        }
        else {
            this.staff.employeestartDate = null;
        }
            this._staffsServiceProxy.createOrEdit(this.staff)
             .pipe(finalize(() => { this.saving = false; }))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }

        openSelectDepartmentModal() {
        this.departmentLookupTableModal.id = this.staff.departmentId;
        this.departmentLookupTableModal.displayName = this.departmentDepartmentName;
        this.departmentLookupTableModal.show();
    }
        openSelectOrganizationUnitModal() {
        this.organizationUnitLookupTableModal.id = this.staff.organizationUnitId;
        this.organizationUnitLookupTableModal.displayName = this.organizationUnitDisplayName;
        this.organizationUnitLookupTableModal.show();
    }
        openSelectStaffModal() {
        this.staffLookupTableModal.id = this.staff.supervisorId ;
        this.staffLookupTableModal.displayName = this.staffFULL_NAME;
        this.staffLookupTableModal.show();
    }


        setDepartmentIdNull() {
        this.staff.departmentId = null;
        this.departmentDepartmentName = '';
    }
        setOrganizationUnitIdNull() {
        this.staff.organizationUnitId = null;
        this.organizationUnitDisplayName = '';
    }
        setsupervisorIdNull() {
        this.staff.supervisorId  = null;
        this.staffFULL_NAME = '';
    }


        getNewDepartmentId() {
        this.staff.departmentId = this.departmentLookupTableModal.id;
        this.departmentDepartmentName = this.departmentLookupTableModal.displayName;
    }
        getNewOrganizationUnitId() {
        this.staff.organizationUnitId = this.organizationUnitLookupTableModal.id;
        this.organizationUnitDisplayName = this.organizationUnitLookupTableModal.displayName;
    }
        getNewsupervisorId () {
        this.staff.supervisorId  = this.staffLookupTableModal.id;
        this.staffFULL_NAME = this.staffLookupTableModal.displayName;
    }


    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
