import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViwTripPlanedDailyComponent } from './trips/viwTripPlanedDaily/viwTripPlanedDaily.component';
import { TripActualRoutes_StationComponent } from './trips/tripActualRoutes_Station/tripActualRoutes_Station.component';
import { TripPlanedDailyWitHDriversComponent } from './trips/tripPlanedDailyWitHDrivers/tripPlanedDailyWitHDrivers.component';
import { Routes_StationsComponent } from './road/routes_Stations/routes_Stations.component';
import { TripActualWitHDriverComponent } from './trips/tripActualWitHDriver/tripActualWitHDriver.component';
import { TripActualComponent } from './trips/tripActual/tripActual.component';
import { TripPlanedWitHDriversComponent } from './trips/tripPlanedWitHDrivers/tripPlanedWitHDrivers.component';
import { BusInfosComponent } from './management/busInfos/busInfos.component';
import { TripPlanedsComponent } from './trips/tripPlaneds/tripPlaneds.component';
import { TripTypesComponent } from './trips/tripTypes/tripTypes.component';
import { TripByMinistriesComponent } from './trips/tripByMinistries/tripByMinistries.component';
import { CalenderBusesComponent } from './trips/calenderBuses/calenderBuses.component';
import { StaffsComponent } from './managment/staffs/staffs.component';
import { DepartmentsComponent } from './managment/departments/departments.component';
import { RoutesComponent } from './road/routes/routes.component';
import { StationsComponent } from './road/stations/stations.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'trips/viwTripPlanedDaily', component: ViwTripPlanedDailyComponent, data: { permission: 'Pages.ViwTripPlanedDaily' }  },
                    { path: 'trips/tripActualRoutes_Station', component: TripActualRoutes_StationComponent, data: { permission: 'Pages.TripActualRoutes_Station' }  },
                    { path: 'trips/tripPlanedDailyWitHDrivers', component: TripPlanedDailyWitHDriversComponent, data: { permission: 'Pages.TripPlanedDailyWitHDrivers' }  },
                    { path: 'road/routes_Stations', component: Routes_StationsComponent, data: { permission: 'Pages.Routes_Stations' }  },
                    { path: 'road/routes_Stations/:id', component: Routes_StationsComponent, data: { permission: 'Pages.Routes_Stations' }  },
                    { path: 'trips/tripActualWitHDriver', component: TripActualWitHDriverComponent, data: { permission: 'Pages.TripActualWitHDriver' }  },
                    { path: 'trips/tripActual', component: TripActualComponent, data: { permission: 'Pages.TripActual' }  },
                    { path: 'trips/tripPlanedWitHDrivers', component: TripPlanedWitHDriversComponent, data: { permission: 'Pages.TripPlanedWitHDrivers' }  },
                    { path: 'management/busInfos', component: BusInfosComponent, data: { permission: 'Pages.BusInfos' }  },
                    { path: 'trips/tripPlaneds', component: TripPlanedsComponent, data: { permission: 'Pages.TripPlaneds' }  },
                    { path: 'trips/tripTypes', component: TripTypesComponent, data: { permission: 'Pages.TripTypes' }  },
                    { path: 'trips/tripByMinistries', component: TripByMinistriesComponent, data: { permission: 'Pages.TripByMinistries' }  },
                    { path: 'trips/calenderBuses', component: CalenderBusesComponent, data: { permission: 'Pages.CalenderBuses' }  },
                    { path: 'managment/departments', component: DepartmentsComponent, data: { permission: 'Pages.Departments' }  },
                    { path: 'road/routes', component: RoutesComponent, data: { permission: 'Pages.Routes' }  },
                    { path: 'road/stations', component: StationsComponent, data: { permission: 'Pages.Stations' }  },
                    { path: 'managment/staffs', component: StaffsComponent, data: { permission: 'Pages.Staffs' }  },
                    { path: 'dashboard', component: DashboardComponent, data: { permission: 'Pages.Tenant.Dashboard' } },
                    { path: 'Vehclies', component: VehiclesComponent }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }
