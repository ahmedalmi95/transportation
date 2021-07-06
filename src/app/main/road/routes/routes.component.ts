import {
    Component,
    Injector,
    ViewEncapsulation,
    ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
    RoutesServiceProxy,
    RouteDto,
} from "@shared/service-proxies/service-proxies";
import { NotifyService } from "@abp/notify/notify.service";
import { AppComponentBase } from "@shared/common/app-component-base";
import { TokenAuthServiceProxy } from "@shared/service-proxies/service-proxies";
import { CreateOrEditRouteModalComponent } from "./create-or-edit-route-modal.component";
import { ViewRouteModalComponent } from "./view-route-modal.component";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { Table } from "primeng/components/table/table";
import { Paginator } from "primeng/components/paginator/paginator";
import { LazyLoadEvent } from "primeng/components/common/lazyloadevent";
import { FileDownloadService } from "@shared/utils/file-download.service";
import { EntityTypeHistoryModalComponent } from "@app/shared/common/entityHistory/entity-type-history-modal.component";
import * as _ from "lodash";
import * as moment from "moment";

@Component({
    templateUrl: "./routes.component.html",
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class RoutesComponent extends AppComponentBase {
    @ViewChild("createOrEditRouteModal", { static: true })
    createOrEditRouteModal: CreateOrEditRouteModalComponent;
    @ViewChild("viewRouteModalComponent", { static: true })
    viewRouteModal: ViewRouteModalComponent;
    @ViewChild("entityTypeHistoryModal", { static: true })
    entityTypeHistoryModal: EntityTypeHistoryModalComponent;
    @ViewChild("dataTable", { static: true }) dataTable: Table;
    @ViewChild("paginator", { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = "";
    maxLineNumberFilter: number;
    maxLineNumberFilterEmpty: number;
    minLineNumberFilter: number;
    minLineNumberFilterEmpty: number;
    maxDirectionFilter: number;
    maxDirectionFilterEmpty: number;
    minDirectionFilter: number;
    minDirectionFilterEmpty: number;
    maxLineCodeFilter: number;
    maxLineCodeFilterEmpty: number;
    minLineCodeFilter: number;
    minLineCodeFilterEmpty: number;
    maxSignageFilter: number;
    maxSignageFilterEmpty: number;
    minSignageFilter: number;
    minSignageFilterEmpty: number;
    maxagencyFilter: number;
    maxagencyFilterEmpty: number;
    minagencyFilter: number;
    minagencyFilterEmpty: number;
    maxTotalKMFilter: number;
    maxTotalKMFilterEmpty: number;
    minTotalKMFilter: number;
    minTotalKMFilterEmpty: number;
    maxTotalMinutesFilter: number;
    maxTotalMinutesFilterEmpty: number;
    minTotalMinutesFilter: number;
    minTotalMinutesFilterEmpty: number;
    routeIDGTFSFilter = "";
    maxCatSedorFilter: number;
    maxCatSedorFilterEmpty: number;
    minCatSedorFilter: number;
    minCatSedorFilterEmpty: number;
    showLineNumber: boolean = false;
    _entityTypeFullName = "BringitPal.POPBUS.Road.Route";
    entityHistoryEnabled = false;

    items = [
        { id: 1, name: "lineNumber" },
        { id: 2, name: "direction" },
        { id: 3, name: "lineCode" },
        { id: 4, name: "signage" },
        { id: 5, name: "agency" },
        { id: 6, name: "totalKM" },
        { id: 7, name: "totalMinutes" },
        { id: 8, name: "routeIDGTFS" },
        { id: 9, name: "catSedor" },
    ];
    selectedItems: any = [];
    islineNumber: boolean = false;
    isdirection: boolean = false;
    islineCode: boolean = false;
    issignage: boolean = false;
    isagency: boolean = false;
    istotalKM: boolean = false;
    istotalMinutes: boolean = false;
    isrouteIDGTFS: boolean = false;
    iscatSedor: boolean = false;

    constructor(
        injector: Injector,
        private _routesServiceProxy: RoutesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.entityHistoryEnabled = this.setIsEntityHistoryEnabled();
        this.selectedItems = JSON.parse(localStorage.getItem("routesTable"));
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

    getRoutes(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._routesServiceProxy
            .getAll(
                this.filterText,
                this.maxLineNumberFilter == null
                    ? this.maxLineNumberFilterEmpty
                    : this.maxLineNumberFilter,
                this.minLineNumberFilter == null
                    ? this.minLineNumberFilterEmpty
                    : this.minLineNumberFilter,
                this.maxDirectionFilter == null
                    ? this.maxDirectionFilterEmpty
                    : this.maxDirectionFilter,
                this.minDirectionFilter == null
                    ? this.minDirectionFilterEmpty
                    : this.minDirectionFilter,
                this.maxLineCodeFilter == null
                    ? this.maxLineCodeFilterEmpty
                    : this.maxLineCodeFilter,
                this.minLineCodeFilter == null
                    ? this.minLineCodeFilterEmpty
                    : this.minLineCodeFilter,
                this.maxSignageFilter == null
                    ? this.maxSignageFilterEmpty
                    : this.maxSignageFilter,
                this.minSignageFilter == null
                    ? this.minSignageFilterEmpty
                    : this.minSignageFilter,
                this.maxagencyFilter == null
                    ? this.maxagencyFilterEmpty
                    : this.maxagencyFilter,
                this.minagencyFilter == null
                    ? this.minagencyFilterEmpty
                    : this.minagencyFilter,
                this.maxTotalKMFilter == null
                    ? this.maxTotalKMFilterEmpty
                    : this.maxTotalKMFilter,
                this.minTotalKMFilter == null
                    ? this.minTotalKMFilterEmpty
                    : this.minTotalKMFilter,
                this.maxTotalMinutesFilter == null
                    ? this.maxTotalMinutesFilterEmpty
                    : this.maxTotalMinutesFilter,
                this.minTotalMinutesFilter == null
                    ? this.minTotalMinutesFilterEmpty
                    : this.minTotalMinutesFilter,
                this.routeIDGTFSFilter,
                this.maxCatSedorFilter == null
                    ? this.maxCatSedorFilterEmpty
                    : this.maxCatSedorFilter,
                this.minCatSedorFilter == null
                    ? this.minCatSedorFilterEmpty
                    : this.minCatSedorFilter,
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

    createRoute(): void {
        this.createOrEditRouteModal.show();
    }

    showHistory(route: RouteDto): void {
        this.entityTypeHistoryModal.show({
            entityId: route.id.toString(),
            entityTypeFullName: this._entityTypeFullName,
            entityTypeDescription: "",
        });
    }

    deleteRoute(route: RouteDto): void {
        this.message.confirm("", (isConfirmed) => {
            if (isConfirmed) {
                this._routesServiceProxy.delete(route.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l("SuccessfullyDeleted"));
                });
            }
        });
    }

    exportToExcel(): void {
        this._routesServiceProxy
            .getRoutesToExcel(
                this.filterText,
                this.maxLineNumberFilter == null
                    ? this.maxLineNumberFilterEmpty
                    : this.maxLineNumberFilter,
                this.minLineNumberFilter == null
                    ? this.minLineNumberFilterEmpty
                    : this.minLineNumberFilter,
                this.maxDirectionFilter == null
                    ? this.maxDirectionFilterEmpty
                    : this.maxDirectionFilter,
                this.minDirectionFilter == null
                    ? this.minDirectionFilterEmpty
                    : this.minDirectionFilter,
                this.maxLineCodeFilter == null
                    ? this.maxLineCodeFilterEmpty
                    : this.maxLineCodeFilter,
                this.minLineCodeFilter == null
                    ? this.minLineCodeFilterEmpty
                    : this.minLineCodeFilter,
                this.maxSignageFilter == null
                    ? this.maxSignageFilterEmpty
                    : this.maxSignageFilter,
                this.minSignageFilter == null
                    ? this.minSignageFilterEmpty
                    : this.minSignageFilter,
                this.maxagencyFilter == null
                    ? this.maxagencyFilterEmpty
                    : this.maxagencyFilter,
                this.minagencyFilter == null
                    ? this.minagencyFilterEmpty
                    : this.minagencyFilter,
                this.maxTotalKMFilter == null
                    ? this.maxTotalKMFilterEmpty
                    : this.maxTotalKMFilter,
                this.minTotalKMFilter == null
                    ? this.minTotalKMFilterEmpty
                    : this.minTotalKMFilter,
                this.maxTotalMinutesFilter == null
                    ? this.maxTotalMinutesFilterEmpty
                    : this.maxTotalMinutesFilter,
                this.minTotalMinutesFilter == null
                    ? this.minTotalMinutesFilterEmpty
                    : this.minTotalMinutesFilter,
                this.routeIDGTFSFilter,
                this.maxCatSedorFilter == null
                    ? this.maxCatSedorFilterEmpty
                    : this.maxCatSedorFilter,
                this.minCatSedorFilter == null
                    ? this.minCatSedorFilterEmpty
                    : this.minCatSedorFilter
            )
            .subscribe((result) => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }
    viewStations(id) {
        this._router.navigate(["/app/main/road/routes_Stations", id]);
    }

    changeFunction() {
        this.islineNumber = false;
        this.isdirection = false;
        this.islineCode = false;
        this.issignage = false;
        this.isagency = false;
        this.istotalKM = false;
        this.istotalMinutes = false;
        this.isrouteIDGTFS = false;
        this.iscatSedor = false;

        // this.selectedItems.push(selectedItem)
        this.selectedItems.forEach((element) => {
            if (element.name == "lineNumber") {
                this.islineNumber = true;
            }

            if (element.name == "direction") {
                this.isdirection = true;
            }

            if (element.name == "lineCode") {
                this.islineCode = true;
            }

            if (element.name == "signage") {
                this.issignage = true;
            }

            if (element.name == "agency") {
                this.isagency = true;
            }

            if (element.name == "totalKM") {
                this.istotalKM = true;
            }

            if (element.name == "totalMinutes") {
                this.istotalMinutes = true;
            }

            if (element.name == "routeIDGTFS") {
                this.isrouteIDGTFS = true;
            }

            if (element.name == "catSedor") {
                this.iscatSedor = true;
            }
        });
        localStorage.setItem("routesTable", JSON.stringify(this.selectedItems));
    }
}
