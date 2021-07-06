import {
    Component,
    Injector,
    ViewEncapsulation,
    ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
    Routes_StationsServiceProxy,
    Routes_StationDto,
} from "@shared/service-proxies/service-proxies";
import { NotifyService } from "@abp/notify/notify.service";
import { AppComponentBase } from "@shared/common/app-component-base";
import { TokenAuthServiceProxy } from "@shared/service-proxies/service-proxies";
import { CreateOrEditRoutes_StationModalComponent } from "./create-or-edit-routes_Station-modal.component";
import { ViewRoutes_StationModalComponent } from "./view-routes_Station-modal.component";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { Table } from "primeng/components/table/table";
import { Paginator } from "primeng/components/paginator/paginator";
import { LazyLoadEvent } from "primeng/components/common/lazyloadevent";
import { FileDownloadService } from "@shared/utils/file-download.service";
import { EntityTypeHistoryModalComponent } from "@app/shared/common/entityHistory/entity-type-history-modal.component";
import * as _ from "lodash";
import * as moment from "moment";
import { switchMap } from "rxjs/operators";

@Component({
    templateUrl: "./routes_Stations.component.html",
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class Routes_StationsComponent extends AppComponentBase {
    @ViewChild("createOrEditRoutes_StationModal", { static: true })
    createOrEditRoutes_StationModal: CreateOrEditRoutes_StationModalComponent;
    @ViewChild("viewRoutes_StationModalComponent", { static: true })
    viewRoutes_StationModal: ViewRoutes_StationModalComponent;
    @ViewChild("entityTypeHistoryModal", { static: true })
    entityTypeHistoryModal: EntityTypeHistoryModalComponent;
    @ViewChild("dataTable", { static: true }) dataTable: Table;
    @ViewChild("paginator", { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = "";
    maxRoutesIDFilter: number;
    maxRoutesIDFilterEmpty: number;
    minRoutesIDFilter: number;
    minRoutesIDFilterEmpty: number;
    maxStationCodeFilter: number;
    maxStationCodeFilterEmpty: number;
    minStationCodeFilter: number;
    minStationCodeFilterEmpty: number;
    maxStationOrderFilter: number;
    maxStationOrderFilterEmpty: number;
    minStationOrderFilter: number;
    minStationOrderFilterEmpty: number;
    maxDistanceFStartFilter: number;
    maxDistanceFStartFilterEmpty: number;
    minDistanceFStartFilter: number;
    minDistanceFStartFilterEmpty: number;
    maxDistanceFPrviousStFilter: number;
    maxDistanceFPrviousStFilterEmpty: number;
    minDistanceFPrviousStFilter: number;
    minDistanceFPrviousStFilterEmpty: number;
    maxTimefrStartStationFilter: number;
    maxTimefrStartStationFilterEmpty: number;
    minTimefrStartStationFilter: number;
    minTimefrStartStationFilterEmpty: number;
    maxLinkToMainFilter: number;
    maxLinkToMainFilterEmpty: number;
    minLinkToMainFilter: number;
    minLinkToMainFilterEmpty: number;
    timefrPrviousFilter = "";
    timeFrStartFilter = "";

    _entityTypeFullName = "BringitPal.POPBUS.Road.Routes_Station";
    entityHistoryEnabled = false;

    constructor(
        injector: Injector,
        private _routes_StationsServiceProxy: Routes_StationsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.entityHistoryEnabled = this.setIsEntityHistoryEnabled();
        this.maxRoutesIDFilter =
            +this._activatedRoute.snapshot.paramMap.get("id");
        this.minRoutesIDFilter =
            +this._activatedRoute.snapshot.paramMap.get("id");
            if(this.maxRoutesIDFilter == 0 && this.minRoutesIDFilter == 0){
                this.maxRoutesIDFilter = null;
                this.minRoutesIDFilter = null;
            }
        return this.getRoutes_Stations();
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

    getRoutes_Stations(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._routes_StationsServiceProxy
            .getAll(
                this.filterText,
                this.maxRoutesIDFilter == null
                    ? this.maxRoutesIDFilterEmpty
                    : this.maxRoutesIDFilter,
                this.minRoutesIDFilter == null
                    ? this.minRoutesIDFilterEmpty
                    : this.minRoutesIDFilter,
                this.maxStationCodeFilter == null
                    ? this.maxStationCodeFilterEmpty
                    : this.maxStationCodeFilter,
                this.minStationCodeFilter == null
                    ? this.minStationCodeFilterEmpty
                    : this.minStationCodeFilter,
                this.maxStationOrderFilter == null
                    ? this.maxStationOrderFilterEmpty
                    : this.maxStationOrderFilter,
                this.minStationOrderFilter == null
                    ? this.minStationOrderFilterEmpty
                    : this.minStationOrderFilter,
                this.maxDistanceFStartFilter == null
                    ? this.maxDistanceFStartFilterEmpty
                    : this.maxDistanceFStartFilter,
                this.minDistanceFStartFilter == null
                    ? this.minDistanceFStartFilterEmpty
                    : this.minDistanceFStartFilter,
                this.maxDistanceFPrviousStFilter == null
                    ? this.maxDistanceFPrviousStFilterEmpty
                    : this.maxDistanceFPrviousStFilter,
                this.minDistanceFPrviousStFilter == null
                    ? this.minDistanceFPrviousStFilterEmpty
                    : this.minDistanceFPrviousStFilter,
                this.maxTimefrStartStationFilter == null
                    ? this.maxTimefrStartStationFilterEmpty
                    : this.maxTimefrStartStationFilter,
                this.minTimefrStartStationFilter == null
                    ? this.minTimefrStartStationFilterEmpty
                    : this.minTimefrStartStationFilter,
                this.maxLinkToMainFilter == null
                    ? this.maxLinkToMainFilterEmpty
                    : this.maxLinkToMainFilter,
                this.minLinkToMainFilter == null
                    ? this.minLinkToMainFilterEmpty
                    : this.minLinkToMainFilter,
                this.timefrPrviousFilter,
                this.timeFrStartFilter,
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

    createRoutes_Station(): void {
        this.createOrEditRoutes_StationModal.show();
    }

    showHistory(routes_Station: Routes_StationDto): void {
        this.entityTypeHistoryModal.show({
            entityId: routes_Station.id.toString(),
            entityTypeFullName: this._entityTypeFullName,
            entityTypeDescription: "",
        });
    }

    deleteRoutes_Station(routes_Station: Routes_StationDto): void {
        this.message.confirm("", (isConfirmed) => {
            if (isConfirmed) {
                this._routes_StationsServiceProxy
                    .delete(routes_Station.id)
                    .subscribe(() => {
                        this.reloadPage();
                        this.notify.success(this.l("SuccessfullyDeleted"));
                    });
            }
        });
    }

    exportToExcel(): void {
        this._routes_StationsServiceProxy
            .getRoutes_StationsToExcel(
                this.filterText,
                this.maxRoutesIDFilter == null
                    ? this.maxRoutesIDFilterEmpty
                    : this.maxRoutesIDFilter,
                this.minRoutesIDFilter == null
                    ? this.minRoutesIDFilterEmpty
                    : this.minRoutesIDFilter,
                this.maxStationCodeFilter == null
                    ? this.maxStationCodeFilterEmpty
                    : this.maxStationCodeFilter,
                this.minStationCodeFilter == null
                    ? this.minStationCodeFilterEmpty
                    : this.minStationCodeFilter,
                this.maxStationOrderFilter == null
                    ? this.maxStationOrderFilterEmpty
                    : this.maxStationOrderFilter,
                this.minStationOrderFilter == null
                    ? this.minStationOrderFilterEmpty
                    : this.minStationOrderFilter,
                this.maxDistanceFStartFilter == null
                    ? this.maxDistanceFStartFilterEmpty
                    : this.maxDistanceFStartFilter,
                this.minDistanceFStartFilter == null
                    ? this.minDistanceFStartFilterEmpty
                    : this.minDistanceFStartFilter,
                this.maxDistanceFPrviousStFilter == null
                    ? this.maxDistanceFPrviousStFilterEmpty
                    : this.maxDistanceFPrviousStFilter,
                this.minDistanceFPrviousStFilter == null
                    ? this.minDistanceFPrviousStFilterEmpty
                    : this.minDistanceFPrviousStFilter,
                this.maxTimefrStartStationFilter == null
                    ? this.maxTimefrStartStationFilterEmpty
                    : this.maxTimefrStartStationFilter,
                this.minTimefrStartStationFilter == null
                    ? this.minTimefrStartStationFilterEmpty
                    : this.minTimefrStartStationFilter,
                this.maxLinkToMainFilter == null
                    ? this.maxLinkToMainFilterEmpty
                    : this.maxLinkToMainFilter,
                this.minLinkToMainFilter == null
                    ? this.minLinkToMainFilterEmpty
                    : this.minLinkToMainFilter,
                this.timefrPrviousFilter,
                this.timeFrStartFilter
            )
            .subscribe((result) => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }
}
