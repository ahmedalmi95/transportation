import {Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {catchError as _observableCatch, finalize, mergeMap as _observableMergeMap} from 'rxjs/operators';
import {
    ViwTripPlanedDailyServiceProxy,
    StaffsServiceProxy,
    TripPlanedDailyWitHDriversServiceProxy,
    BusInfosServiceProxy,
    CreateOrEditViwTripPlanedDailyDto, PagedResultDtoOfGetBusInfoForView, PagedResultDtoOfGetStaffForView
} from '@shared/service-proxies/service-proxies';
import {AppComponentBase} from '@shared/common/app-component-base';
import * as moment from 'moment';
import {Observable, throwError as _observableThrow} from '@node_modules/rxjs';
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';
import {SelectItem} from 'primeng/api';
import {Table} from 'primeng/components/table/table';
import {Paginator} from 'primeng/components/paginator/paginator';


@Component({
    selector: 'replaceViwTripPlanedDailyModal',
    templateUrl: './replace-viwTripPlanedDaily-modal.component.html'
})


//

export class ReplaceTripPlanedDailyModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;
    @ViewChild('dataTable', {static: true}) dataTable: Table;
    @ViewChild('paginator', {static: true}) paginator: Paginator;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() modalShow: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;



    viwTripPlanedDaily: CreateOrEditViwTripPlanedDailyDto = new CreateOrEditViwTripPlanedDailyDto();
    
    tripMinistryStart_date: Date;
    trpPlanStart_date: Date;
    trpPlanEnd_date: Date;
    workingday: Date;
    fulL_NAMEFilter: string;
    selectedPersonId: number;

    staffs: any[];
    oldTaskNo: number;
    taskno: number;
    oldbusId: number;
    oldDriverId: number;
    newBusId: number;
    newDriverID: number;
    maxWorkingdayFilter: moment.Moment;

      
// selectedStaff: Staff;

    constructor(
        injector: Injector,
        private _viwTripPlanedDailyServiceProxy: ViwTripPlanedDailyServiceProxy,
        private _busInfosServiceProxy: BusInfosServiceProxy,
        private _staffsServiceProxy: StaffsServiceProxy,
        private _tripPlanedDailyWitHDriversServiceProxy: TripPlanedDailyWitHDriversServiceProxy,

    ) {
        super(injector);
        this.getStaffs()


}

    show(viwTripPlanedDailyId?: number): void {

        this.fulL_NAMEFilter = '';
            this._viwTripPlanedDailyServiceProxy.getViwTripPlanedDailyForEdit(viwTripPlanedDailyId).subscribe(result => {

                if (this.viwTripPlanedDaily.tripMinistryStart_date) {
                    this.tripMinistryStart_date = this.viwTripPlanedDaily.tripMinistryStart_date.toDate();
                }
                if (this.viwTripPlanedDaily.trpPlanStart_date) {
                    this.trpPlanStart_date = this.viwTripPlanedDaily.trpPlanStart_date.toDate();
                }
                if (this.viwTripPlanedDaily.trpPlanEnd_date) {
                    this.trpPlanEnd_date = this.viwTripPlanedDaily.trpPlanEnd_date.toDate();
                }
                if (this.viwTripPlanedDaily.workingday) {
                    this.workingday = this.viwTripPlanedDaily.workingday.toDate();
                }

                this.active = true;
                this.modal.show();
            });

    }

    save(): void {
        this.saving = true;
        this._tripPlanedDailyWitHDriversServiceProxy.replaceAllTaskNo(
            this.taskno,
            this.oldbusId,
            this.oldDriverId,
            this.newBusId,
            this.newDriverID
        ).pipe(finalize(() => { this.saving = false; }))
        .subscribe(() => {
           this.notify.info(this.l('SavedSuccessfully'));
           this.close();
           this.modalSave.emit(null);
        })

    }
   
    getStaffs(){

            this._staffsServiceProxy.getAll(
                undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,
                undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined).
                subscribe(result => {
                   // this.primengTableHelper.totalRecordsCount = result.totalCount;
                    //this.primengTableHelper.records = result.items;
                    //this.primengTableHelper.hideLoadingIndicator();
                    var tempStaff = [];
                    tempStaff.push(
                        {label:'Select Driver', value:null},
                    )
                    result.items.forEach((item, index)=>{
                        tempStaff.push({
                            label: item.staff.fulL_NAME, value: item.staff.id
                        })
                    })
                    this.staffs = tempStaff;
                });

    }


    getTripDataByBus(event) {
       /* if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }*/
        // this._viwTripPlanedDailyServiceProxy.getAllByBus(this.maxWorkingdayFilter,'1','1',1).subscribe(result => {
        //         this.primengTableHelper.totalRecordsCount = result.totalCount;
        //         this.primengTableHelper.records = result.items;
        //         this.primengTableHelper.hideLoadingIndicator();
        //         console.log(result)
        //     });

            this._viwTripPlanedDailyServiceProxy.getAll("","","",undefined,undefined,"",undefined,undefined,undefined,undefined,"",
            undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,"",-1,-1,-1,-1,-1,-1,-1,undefined,undefined
            ,undefined,undefined,-1,-1,-1,-1,-1,-1,-1,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,-1,"",
            undefined,undefined,undefined,undefined,undefined,undefined,"","",undefined,undefined,undefined,undefined,undefined,undefined,
            undefined,undefined,undefined,undefined,undefined,0,undefined,"","","","",undefined,undefined,undefined,undefined,"","",undefined,undefined,
            undefined,undefined,undefined,undefined,undefined,undefined,undefined,0,10).subscribe(result => {
                this.primengTableHelper.totalRecordsCount = result.totalCount;
                this.primengTableHelper.records = result.items;
                this.primengTableHelper.hideLoadingIndicator();
                console.log(result)
            });
        // this.primengTableHelper.showLoadingIndicator();

        // this._busInfosServiceProxy.getAll(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined
        // ).subscribe(result => {
        //     this.primengTableHelper.totalRecordsCount = result.totalCount;
        //     this.primengTableHelper.records = result.items;
        //     this.primengTableHelper.hideLoadingIndicator();
        //     console.log(result)
        // });
     //   this.modalShow.emit(null);

    }
    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
