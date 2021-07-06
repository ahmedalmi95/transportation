import {
    Component,
    Injector,
    ViewEncapsulation,
    ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
    BusInfosServiceProxy,
    BusInfoDto,
} from "@shared/service-proxies/service-proxies";
import { NotifyService } from "@abp/notify/notify.service";
import { AppComponentBase } from "@shared/common/app-component-base";
import { TokenAuthServiceProxy } from "@shared/service-proxies/service-proxies";
import { CreateOrEditBusInfoModalComponent } from "./create-or-edit-busInfo-modal.component";
import { ViewBusInfoModalComponent } from "./view-busInfo-modal.component";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { Table } from "primeng/components/table/table";
import { Paginator } from "primeng/components/paginator/paginator";
import { LazyLoadEvent } from "primeng/components/common/lazyloadevent";
import { FileDownloadService } from "@shared/utils/file-download.service";
import { EntityTypeHistoryModalComponent } from "@app/shared/common/entityHistory/entity-type-history-modal.component";
import * as _ from "lodash";
import * as moment from "moment";

@Component({
    templateUrl: "./busInfos.component.html",
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class BusInfosComponent extends AppComponentBase {
    @ViewChild("createOrEditBusInfoModal", { static: true })
    createOrEditBusInfoModal: CreateOrEditBusInfoModalComponent;
    @ViewChild("viewBusInfoModalComponent", { static: true })
    viewBusInfoModal: ViewBusInfoModalComponent;
    @ViewChild("entityTypeHistoryModal", { static: true })
    entityTypeHistoryModal: EntityTypeHistoryModalComponent;
    @ViewChild("dataTable", { static: true }) dataTable: Table;
    @ViewChild("paginator", { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = "";
    busNumberFilter = "";
    busModelFilter = "";
    modelFilter = "";
    chassisNumberFilter = "";
    trackerIEMIFilter = "";
    maxInsuPolicyNumberFilter: moment.Moment;
    minInsuPolicyNumberFilter: moment.Moment;
    maxCapcityFilter: number;
    maxCapcityFilterEmpty: number;
    minCapcityFilter: number;
    minCapcityFilterEmpty: number;

    _entityTypeFullName = "BringitPal.POPBUS.Management.BusInfo";
    entityHistoryEnabled = false;

    items = [
        { id: 1, name: "busNumber" },
        { id: 2, name: "busModel" },
        { id: 3, name: "model" },
        { id: 4, name: "chassisNumber" },
        { id: 5, name: "trackerIEMI" },
        { id: 6, name: "insuPolicyNumber" },
        { id: 7, name: "capcity" },
    ];
    selectedItems: any = [];
    isbusNumber: boolean = false;
    isbusModel: boolean = false;
    ismodel: boolean = false;
    ischassisNumber: boolean = false;
    istrackerIEMI: boolean = false;
    isinsuPolicyNumber: boolean = false;
    iscapcity: boolean = false;

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
        this.selectedItems = JSON.parse(localStorage.getItem("busTableShow"));
        this.changeFunction();
    }

    private setIsEntityHistoryEnabled(): boolean {
        let customSettings = (abp as any).custom;
        return (
            customSettings.EntityHistory &&
            customSettings.EntityHistory.isEnabled &&
            _.filter(
                customSettings.EntityHistory.enabledEntities,
                (entityType) => entityType === this._entityTypeFullName
            ).length === 1
        );
    }

    getBusInfos(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._busInfosServiceProxy
            .getAll(
                this.filterText,
                this.busNumberFilter,
                this.busModelFilter,
                this.modelFilter,
                this.chassisNumberFilter,
                this.trackerIEMIFilter,
                this.maxInsuPolicyNumberFilter,
                this.minInsuPolicyNumberFilter,
                this.maxCapcityFilter == null
                    ? this.maxCapcityFilterEmpty
                    : this.maxCapcityFilter,
                this.minCapcityFilter == null
                    ? this.minCapcityFilterEmpty
                    : this.minCapcityFilter,
                this.primengTableHelper.getSorting(this.dataTable),
                this.primengTableHelper.getSkipCount(this.paginator, event),
                this.primengTableHelper.getMaxResultCount(this.paginator, event)
            )
            .subscribe((result) => {
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
            entityTypeDescription: "",
        });
    }

    deleteBusInfo(busInfo: BusInfoDto): void {
        this.message.confirm("", (isConfirmed) => {
            if (isConfirmed) {
                this._busInfosServiceProxy.delete(busInfo.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l("SuccessfullyDeleted"));
                });
            }
        });
    }

    exportToExcel(): void {
        this._busInfosServiceProxy
            .getBusInfosToExcel(
                this.filterText,
                this.busNumberFilter,
                this.busModelFilter,
                this.modelFilter,
                this.chassisNumberFilter,
                this.trackerIEMIFilter,
                this.maxInsuPolicyNumberFilter,
                this.minInsuPolicyNumberFilter,
                this.maxCapcityFilter == null
                    ? this.maxCapcityFilterEmpty
                    : this.maxCapcityFilter,
                this.minCapcityFilter == null
                    ? this.minCapcityFilterEmpty
                    : this.minCapcityFilter
            )
            .subscribe((result) => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    changeFunction() {
        this.isbusNumber = false;
        this.isbusModel = false;
        this.ismodel = false;
        this.ischassisNumber = false;
        this.istrackerIEMI = false;
        this.isinsuPolicyNumber = false;
        this.iscapcity = false;

        // this.selectedItems.push(selectedItem)
        this.selectedItems.forEach((element) => {
            if (element.name == "busNumber") {
                this.isbusNumber = true;
            }

            if (element.name == "busModel") {
                this.isbusModel = true;
            }

            if (element.name == "model") {
                this.ismodel = true;
            }

            if (element.name == "chassisNumber") {
                this.ischassisNumber = true;
            }

            if (element.name == "trackerIEMI") {
                this.istrackerIEMI = true;
            }

            if (element.name == "insuPolicyNumber") {
                this.isinsuPolicyNumber = true;
            }

            if (element.name == "capcity") {
                this.iscapcity = true;
            }
        });
        localStorage.setItem(
            "busTableShow",
            JSON.stringify(this.selectedItems)
        );
    }
}
