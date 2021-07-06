import {
    Component,
    Injector,
    ViewEncapsulation,
    ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
    StationsServiceProxy,
    StationDto,
} from "@shared/service-proxies/service-proxies";
import { NotifyService } from "@abp/notify/notify.service";
import { AppComponentBase } from "@shared/common/app-component-base";
import { TokenAuthServiceProxy } from "@shared/service-proxies/service-proxies";
import { CreateOrEditStationModalComponent } from "./create-or-edit-station-modal.component";
import { ViewStationModalComponent } from "./view-station-modal.component";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { Table } from "primeng/components/table/table";
import { Paginator } from "primeng/components/paginator/paginator";
import { LazyLoadEvent } from "primeng/components/common/lazyloadevent";
import { FileDownloadService } from "@shared/utils/file-download.service";
import { EntityTypeHistoryModalComponent } from "@app/shared/common/entityHistory/entity-type-history-modal.component";
import * as _ from "lodash";
import * as moment from "moment";

@Component({
    templateUrl: "./stations.component.html",
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class StationsComponent extends AppComponentBase {
    @ViewChild("createOrEditStationModal", { static: true })
    createOrEditStationModal: CreateOrEditStationModalComponent;
    @ViewChild("viewStationModalComponent", { static: true })
    viewStationModal: ViewStationModalComponent;
    @ViewChild("entityTypeHistoryModal", { static: true })
    entityTypeHistoryModal: EntityTypeHistoryModalComponent;
    @ViewChild("dataTable", { static: true }) dataTable: Table;
    @ViewChild("paginator", { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = "";
    locationNameFilter = "";
    maxLatitudeFilter: number;
    maxLatitudeFilterEmpty: number;
    minLatitudeFilter: number;
    minLatitudeFilterEmpty: number;
    maxLongitudeFilter: number;
    maxLongitudeFilterEmpty: number;
    minLongitudeFilter: number;
    minLongitudeFilterEmpty: number;
    isStopFilter = -1;
    maxStationCodeFilter: number;
    maxStationCodeFilterEmpty: number;
    minStationCodeFilter: number;
    minStationCodeFilterEmpty: number;
    locationNameHebrewFilter = "";
    typeFilter = "";
    isMarkFilter = -1;
    isSaveFilter = -1;
    maxcheckDistanceFilter: number;
    maxcheckDistanceFilterEmpty: number;
    mincheckDistanceFilter: number;
    mincheckDistanceFilterEmpty: number;
    isPathFilter = -1;

    _entityTypeFullName = "BringitPal.POPBUS.Road.Station";
    entityHistoryEnabled = false;

    items = [
        { id: 1, name: "locationName" },
        { id: 2, name: "latitude" },
        { id: 3, name: "longitude" },
        { id: 4, name: "isStop" },
        { id: 5, name: "stationCode" },
        { id: 6, name: "locationNameHebrew" },
        { id: 7, name: "type" },
        { id: 8, name: "isMark" },
        { id: 9, name: "isSave" },
        { id: 10, name: "ischeckDistance" },
        { id: 11, name: "isPath" },
    ];
    selectedItems: any = [];
    islocationName: boolean = false;
    islatitude: boolean = false;
    islongitude: boolean = false;
    isisStop: boolean = false;
    isstationCode: boolean = false;
    islocationNameHebrew: boolean = false;
    istype: boolean = false;
    isisMark: boolean = false;
    isisSave: boolean = false;
    ischeckDistance: boolean = false;
    isisPath: boolean = false;

    constructor(
        injector: Injector,
        private _stationsServiceProxy: StationsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.entityHistoryEnabled = this.setIsEntityHistoryEnabled();
        this.selectedItems = JSON.parse(localStorage.getItem("stationTable"));
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

    getStations(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._stationsServiceProxy
            .getAll(
                this.filterText,
                this.locationNameFilter,
                this.maxLatitudeFilter == null
                    ? this.maxLatitudeFilterEmpty
                    : this.maxLatitudeFilter,
                this.minLatitudeFilter == null
                    ? this.minLatitudeFilterEmpty
                    : this.minLatitudeFilter,
                this.maxLongitudeFilter == null
                    ? this.maxLongitudeFilterEmpty
                    : this.maxLongitudeFilter,
                this.minLongitudeFilter == null
                    ? this.minLongitudeFilterEmpty
                    : this.minLongitudeFilter,
                this.isStopFilter,
                this.maxStationCodeFilter == null
                    ? this.maxStationCodeFilterEmpty
                    : this.maxStationCodeFilter,
                this.minStationCodeFilter == null
                    ? this.minStationCodeFilterEmpty
                    : this.minStationCodeFilter,
                this.locationNameHebrewFilter,
                this.typeFilter,
                this.isMarkFilter,
                this.isSaveFilter,
                this.maxcheckDistanceFilter == null
                    ? this.maxcheckDistanceFilterEmpty
                    : this.maxcheckDistanceFilter,
                this.mincheckDistanceFilter == null
                    ? this.mincheckDistanceFilterEmpty
                    : this.mincheckDistanceFilter,
                this.isPathFilter,
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

    createStation(): void {
        this.createOrEditStationModal.show();
    }

    showHistory(station: StationDto): void {
        this.entityTypeHistoryModal.show({
            entityId: station.id.toString(),
            entityTypeFullName: this._entityTypeFullName,
            entityTypeDescription: "",
        });
    }

    deleteStation(station: StationDto): void {
        this.message.confirm("", (isConfirmed) => {
            if (isConfirmed) {
                this._stationsServiceProxy.delete(station.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l("SuccessfullyDeleted"));
                });
            }
        });
    }

    exportToExcel(): void {
        this._stationsServiceProxy
            .getStationsToExcel(
                this.filterText,
                this.locationNameFilter,
                this.maxLatitudeFilter == null
                    ? this.maxLatitudeFilterEmpty
                    : this.maxLatitudeFilter,
                this.minLatitudeFilter == null
                    ? this.minLatitudeFilterEmpty
                    : this.minLatitudeFilter,
                this.maxLongitudeFilter == null
                    ? this.maxLongitudeFilterEmpty
                    : this.maxLongitudeFilter,
                this.minLongitudeFilter == null
                    ? this.minLongitudeFilterEmpty
                    : this.minLongitudeFilter,
                this.isStopFilter,
                this.maxStationCodeFilter == null
                    ? this.maxStationCodeFilterEmpty
                    : this.maxStationCodeFilter,
                this.minStationCodeFilter == null
                    ? this.minStationCodeFilterEmpty
                    : this.minStationCodeFilter,
                this.locationNameHebrewFilter,
                this.typeFilter,
                this.isMarkFilter,
                this.isSaveFilter,
                this.maxcheckDistanceFilter == null
                    ? this.maxcheckDistanceFilterEmpty
                    : this.maxcheckDistanceFilter,
                this.mincheckDistanceFilter == null
                    ? this.mincheckDistanceFilterEmpty
                    : this.mincheckDistanceFilter,
                this.isPathFilter
            )
            .subscribe((result) => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    changeFunction() {
        this.islocationName = false;
        this.islatitude = false;
        this.islongitude = false;
        this.isisStop = false;
        this.isstationCode = false;
        this.islocationNameHebrew = false;
        this.istype = false;
        this.isisMark = false;
        this.isisSave = false;

        // this.selectedItems.push(selectedItem)
        this.selectedItems.forEach((element) => {
            if (element.name == "locationName") {
                this.islocationName = true;
            }

            if (element.name == "latitude") {
                this.islatitude = true;
            }

            if (element.name == "longitude") {
                this.islongitude = true;
            }

            if (element.name == "isStop") {
                this.isisStop = true;
            }

            if (element.name == "stationCode") {
                this.isstationCode = true;
            }

            if (element.name == "locationNameHebrew") {
                this.islocationNameHebrew = true;
            }

            if (element.name == "type") {
                this.istype = true;
            }

            if (element.name == "isMark") {
                this.isisMark = true;
            }

            if (element.name == "isSave") {
                this.isisSave = true;
            }
            if (element.name == "ischeckDistance") {
                this.ischeckDistance = true;
            }
            if (element.name == "isPath") {
                this.isisPath = true;
            }
        });
        localStorage.setItem(
            "stationTable",
            JSON.stringify(this.selectedItems)
        );
    }
}
