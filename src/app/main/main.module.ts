import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppCommonModule } from "@app/shared/common/app-common.module";
import { TripActualComponent } from "./trips/tripActual/tripActual.component";
import { ViewTripActualModalComponent } from "./trips/tripActual/view-tripActual-modal.component";
import { CreateOrEditTripActualModalComponent } from "./trips/tripActual/create-or-edit-tripActual-modal.component";
import { TripPlanedLookupTableModalComponent } from "./trips/tripActual/tripPlaned-lookup-table-modal.component";
import { TripByMinistryLookupTableModalComponent } from "./trips/tripActual/tripByMinistry-lookup-table-modal.component";
import { VehiclesComponent } from "./vehicles/vehicles.component";

import { TripByMinistriesComponent } from "./trips/tripByMinistries/tripByMinistries.component";
import { ViewTripByMinistryModalComponent } from "./trips/tripByMinistries/view-tripByMinistry-modal.component";
import { CreateOrEditTripByMinistryModalComponent } from "./trips/tripByMinistries/create-or-edit-tripByMinistry-modal.component";
import { RouteLookupTableModalComponent } from "./trips/tripByMinistries/route-lookup-table-modal.component";
import { CalenderBusLookupTableModalComponent } from "./trips/tripByMinistries/calenderBus-lookup-table-modal.component";

import { ViwTripPlanedDailyComponent } from "./trips/viwTripPlanedDaily/viwTripPlanedDaily.component";
import { ViewViwTripPlanedDailyModalComponent } from "./trips/viwTripPlanedDaily/view-viwTripPlanedDaily-modal.component";
import { CreateOrEditViwTripPlanedDailyModalComponent } from "./trips/viwTripPlanedDaily/create-or-edit-viwTripPlanedDaily-modal.component";
import { ReplaceTripPlanedDailyModalComponent } from "./trips/viwTripPlanedDaily/replace-viwTripPlanedDaily-modal.component";

import { TripActualRoutes_StationComponent } from "./trips/tripActualRoutes_Station/tripActualRoutes_Station.component";
import { ViewTripActualRoutes_StationModalComponent } from "./trips/tripActualRoutes_Station/view-tripActualRoutes_Station-modal.component";
import { CreateOrEditTripActualRoutes_StationModalComponent } from "./trips/tripActualRoutes_Station/create-or-edit-tripActualRoutes_Station-modal.component";

import { TripPlanedDailyWitHDriversComponent } from "./trips/tripPlanedDailyWitHDrivers/tripPlanedDailyWitHDrivers.component";
import { ViewTripPlanedDailyWitHDriverModalComponent } from "./trips/tripPlanedDailyWitHDrivers/view-tripPlanedDailyWitHDriver-modal.component";
import { CreateOrEditTripPlanedDailyWitHDriverModalComponent } from "./trips/tripPlanedDailyWitHDrivers/create-or-edit-tripPlanedDailyWitHDriver-modal.component";

import { Routes_StationsComponent } from "./road/routes_Stations/routes_Stations.component";
import { ViewRoutes_StationModalComponent } from "./road/routes_Stations/view-routes_Station-modal.component";
import { CreateOrEditRoutes_StationModalComponent } from "./road/routes_Stations/create-or-edit-routes_Station-modal.component";

import { TripActualWitHDriverComponent } from "./trips/tripActualWitHDriver/tripActualWitHDriver.component";
import { ViewTripActualWitHDriverModalComponent } from "./trips/tripActualWitHDriver/view-tripActualWitHDriver-modal.component";
import { CreateOrEditTripActualWitHDriverModalComponent } from "./trips/tripActualWitHDriver/create-or-edit-tripActualWitHDriver-modal.component";

import { TripPlanedWitHDriversComponent } from "./trips/tripPlanedWitHDrivers/tripPlanedWitHDrivers.component";
import { ViewTripPlanedWitHDriverModalComponent } from "./trips/tripPlanedWitHDrivers/view-tripPlanedWitHDriver-modal.component";
import { CreateOrEditTripPlanedWitHDriverModalComponent } from "./trips/tripPlanedWitHDrivers/create-or-edit-tripPlanedWitHDriver-modal.component";

import { BusInfosComponent } from "./management/busInfos/busInfos.component";
import { ViewBusInfoModalComponent } from "./management/busInfos/view-busInfo-modal.component";
import { CreateOrEditBusInfoModalComponent } from "./management/busInfos/create-or-edit-busInfo-modal.component";

import { TripPlanedsComponent } from "./trips/tripPlaneds/tripPlaneds.component";
import { ViewTripPlanedModalComponent } from "./trips/tripPlaneds/view-tripPlaned-modal.component";
import { CreateOrEditTripPlanedModalComponent } from "./trips/tripPlaneds/create-or-edit-tripPlaned-modal.component";
import { TripTypeLookupTableModalComponent } from "./trips/tripPlaneds/tripType-lookup-table-modal.component";

import { TripTypesComponent } from "./trips/tripTypes/tripTypes.component";
import { ViewTripTypeModalComponent } from "./trips/tripTypes/view-tripType-modal.component";
import { CreateOrEditTripTypeModalComponent } from "./trips/tripTypes/create-or-edit-tripType-modal.component";

import { CalenderBusesComponent } from "./trips/calenderBuses/calenderBuses.component";
import { ViewCalenderBusModalComponent } from "./trips/calenderBuses/view-calenderBus-modal.component";
import { CreateOrEditCalenderBusModalComponent } from "./trips/calenderBuses/create-or-edit-calenderBus-modal.component";

import { StaffsComponent } from "./managment/staffs/staffs.component";
import { ViewStaffModalComponent } from "./managment/staffs/view-staff-modal.component";
import { CreateOrEditStaffModalComponent } from "./managment/staffs/create-or-edit-staff-modal.component";
import { StaffLookupTableModalComponent } from "./managment/staffs/staff-lookup-table-modal.component";
import { OrganizationUnitLookupTableModalComponent } from "./managment/staffs/organizationUnit-lookup-table-modal.component";

import { DepartmentLookupTableModalComponent } from "./managment/staffs/department-lookup-table-modal.component";

import { DepartmentsComponent } from "./managment/departments/departments.component";
import { ViewDepartmentModalComponent } from "./managment/departments/view-department-modal.component";
import { CreateOrEditDepartmentModalComponent } from "./managment/departments/create-or-edit-department-modal.component";

import { RoutesComponent } from "./road/routes/routes.component";
import { ViewRouteModalComponent } from "./road/routes/view-route-modal.component";
import { CreateOrEditRouteModalComponent } from "./road/routes/create-or-edit-route-modal.component";

import { StationsComponent } from "./road/stations/stations.component";
import { ViewStationModalComponent } from "./road/stations/view-station-modal.component";
import { CreateOrEditStationModalComponent } from "./road/stations/create-or-edit-station-modal.component";

import { AutoCompleteModule } from "primeng/primeng";
import { PaginatorModule } from "primeng/primeng";
import { EditorModule } from "primeng/primeng";
import { InputMaskModule } from "primeng/primeng";
import { FileUploadModule } from "primeng/primeng";
import { TableModule } from "primeng/table";

import { UtilsModule } from "@shared/utils/utils.module";
import { CountoModule } from "angular2-counto";
import {
    ModalModule,
    TabsModule,
    TooltipModule,
    BsDropdownModule,
    PopoverModule,
} from "ngx-bootstrap";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MainRoutingModule } from "./main-routing.module";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { NgSelectModule } from '@ng-select/ng-select';

import {
    BsDatepickerModule,
    BsDatepickerConfig,
    BsDaterangepickerConfig,
    BsLocaleService,
} from "ngx-bootstrap/datepicker";
import { NgxBootstrapDatePickerConfigService } from "assets/ngx-bootstrap/ngx-bootstrap-datepicker-config.service";

NgxBootstrapDatePickerConfigService.registerNgxBootstrapDatePickerLocales();

@NgModule({
    imports: [
        FileUploadModule,
        AutoCompleteModule,
        PaginatorModule,
        EditorModule,
        InputMaskModule,
        TableModule,
        NgSelectModule,
        CommonModule,
        FormsModule,
        ModalModule,
        TabsModule,
        TooltipModule,
        AppCommonModule,
        UtilsModule,
        MainRoutingModule,
        CountoModule,
        NgxChartsModule,
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        PopoverModule.forRoot(),
    ],
    declarations: [
        TripActualComponent,
        ViewTripActualModalComponent,
        CreateOrEditTripActualModalComponent,
        TripPlanedLookupTableModalComponent,
        TripByMinistryLookupTableModalComponent,
        TripByMinistriesComponent,
        ViewTripByMinistryModalComponent,
        CreateOrEditTripByMinistryModalComponent,
        RouteLookupTableModalComponent,
        CalenderBusLookupTableModalComponent,
        ViwTripPlanedDailyComponent,
        ViewViwTripPlanedDailyModalComponent,
        CreateOrEditViwTripPlanedDailyModalComponent,
        ReplaceTripPlanedDailyModalComponent,
        TripActualRoutes_StationComponent,
        ViewTripActualRoutes_StationModalComponent,
        CreateOrEditTripActualRoutes_StationModalComponent,
        TripPlanedDailyWitHDriversComponent,
        ViewTripPlanedDailyWitHDriverModalComponent,
        CreateOrEditTripPlanedDailyWitHDriverModalComponent,
        Routes_StationsComponent,
        ViewRoutes_StationModalComponent,
        CreateOrEditRoutes_StationModalComponent,
        TripActualWitHDriverComponent,
        ViewTripActualWitHDriverModalComponent,
        CreateOrEditTripActualWitHDriverModalComponent,
		VehiclesComponent,
        TripPlanedWitHDriversComponent,
        ViewTripPlanedWitHDriverModalComponent,
        CreateOrEditTripPlanedWitHDriverModalComponent,
        BusInfosComponent,
        ViewBusInfoModalComponent,
        CreateOrEditBusInfoModalComponent,
        TripPlanedsComponent,
        ViewTripPlanedModalComponent,
        CreateOrEditTripPlanedModalComponent,
        TripTypeLookupTableModalComponent,
        TripTypesComponent,
        ViewTripTypeModalComponent,
        CreateOrEditTripTypeModalComponent,

        CalenderBusesComponent,
        ViewCalenderBusModalComponent,
        CreateOrEditCalenderBusModalComponent,
        StaffsComponent,
        ViewStaffModalComponent,
        CreateOrEditStaffModalComponent,
        StaffLookupTableModalComponent,
        OrganizationUnitLookupTableModalComponent,
        StaffsComponent,
        ViewStaffModalComponent,
        CreateOrEditStaffModalComponent,
        DepartmentLookupTableModalComponent,
        DepartmentsComponent,
        ViewDepartmentModalComponent,
        CreateOrEditDepartmentModalComponent,
        DepartmentsComponent,
        ViewDepartmentModalComponent,
        CreateOrEditDepartmentModalComponent,
        RoutesComponent,
        ViewRouteModalComponent,
        CreateOrEditRouteModalComponent,
        StationsComponent,
        ViewStationModalComponent,
        CreateOrEditStationModalComponent,
        StaffsComponent,

        DashboardComponent,
    ],
    providers: [
        {
            provide: BsDatepickerConfig,
            useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig,
        },
        {
            provide: BsDaterangepickerConfig,
            useFactory:
                NgxBootstrapDatePickerConfigService.getDaterangepickerConfig,
        },
        {
            provide: BsLocaleService,
            useFactory: NgxBootstrapDatePickerConfigService.getDatepickerLocale,
        },
    ],
})
export class MainModule {}
