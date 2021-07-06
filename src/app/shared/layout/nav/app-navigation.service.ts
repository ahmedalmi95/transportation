import { PermissionCheckerService } from "@abp/auth/permission-checker.service";
import { AppSessionService } from "@shared/common/session/app-session.service";

import { Injectable } from "@angular/core";
import { AppMenu } from "./app-menu";
import { AppMenuItem } from "./app-menu-item";

@Injectable()
export class AppNavigationService {
    constructor(
        private _permissionCheckerService: PermissionCheckerService,
        private _appSessionService: AppSessionService
    ) {}

    getMenu(): AppMenu {
        return new AppMenu("MainMenu", "MainMenu", [
            new AppMenuItem(
                "Dashboard",
                "Pages.Administration.Host.Dashboard",
                "flaticon-line-graph",
                "/app/admin/hostDashboard"
            ),
            new AppMenuItem(
                "Dashboard",
                "Pages.Tenant.Dashboard",
                "flaticon-line-graph",
                "/app/main/dashboard"
            ),
            new AppMenuItem(
                "Tenants",
                "Pages.Tenants",
                "flaticon-list-3",
                "/app/admin/tenants"
            ),
            new AppMenuItem(
                "Editions",
                "Pages.Editions",
                "flaticon-app",
                "/app/admin/editions"
            ),

            new AppMenuItem(
                "Staffs",
                "Pages.Staffs",
                "flaticon-more",
                "/app/main/managment/staffs"
            ),

            new AppMenuItem(
                "Stations",
                "Pages.Stations",
                "flaticon-more",
                "/app/main/road/stations"
            ),

            new AppMenuItem(
                "Routes",
                "Pages.Routes",
                "flaticon-more",
                "/app/main/road/routes"
            ),

            new AppMenuItem(
                "Department",
                "Pages.Department",
                "flaticon-more",
                "/app/main/department/department"
            ),

            new AppMenuItem(
                "Departments",
                "Pages.Departments",
                "flaticon-more",
                "/app/main/managment/departments"
            ),

            new AppMenuItem(
                "CalenderBuses",
                "Pages.CalenderBuses",
                "flaticon-more",
                "/app/main/trips/calenderBuses"
            ),

            new AppMenuItem(
                "TripByMinistries",
                "Pages.TripByMinistries",
                "flaticon-more",
                "/app/main/trips/tripByMinistries"
            ),

            new AppMenuItem(
                "TripTypes",
                "Pages.TripTypes",
                "flaticon-more",
                "/app/main/trips/tripTypes"
            ),

            new AppMenuItem(
                "TripPlaneds",
                "Pages.TripPlaneds",
                "flaticon-more",
                "/app/main/trips/tripPlaneds"
            ),

            new AppMenuItem(
                "BusInfos",
                "Pages.BusInfos",
                "flaticon-more",
                "/app/main/management/busInfos"
            ),

            new AppMenuItem(
                "TripPlanedWitHDrivers",
                "Pages.TripPlanedWitHDrivers",
                "flaticon-more",
                "/app/main/trips/tripPlanedWitHDrivers"
            ),

            new AppMenuItem(
                "TripActual",
                "Pages.TripActual",
                "flaticon-more",
                "/app/main/trips/tripActual"
            ),

            new AppMenuItem(
                "TripActualWitHDriver",
                "Pages.TripActualWitHDriver",
                "flaticon-more",
                "/app/main/trips/tripActualWitHDriver"
            ),

            new AppMenuItem(
                "Routes_Stations",
                "Pages.Routes_Stations",
                "flaticon-more",
                "/app/main/road/routes_Stations"
            ),

            new AppMenuItem(
                "TripPlanedDailyWitHDrivers",
                "Pages.TripPlanedDailyWitHDrivers",
                "flaticon-more",
                "/app/main/trips/tripPlanedDailyWitHDrivers"
            ),

            new AppMenuItem(
                "TripActualRoutes_Station",
                "Pages.TripActualRoutes_Station",
                "flaticon-more",
                "/app/main/trips/tripActualRoutes_Station"
            ),
            new AppMenuItem(
                "Vehclies",
                null,
                "flaticon-more",
                "/app/main/Vehclies"
            ),

            new AppMenuItem(
                "ViwTripPlanedDaily",
                "Pages.ViwTripPlanedDaily",
                "flaticon-more",
                "/app/main/trips/viwTripPlanedDaily"
            ),
            new AppMenuItem("Administration", "", "flaticon-interface-8", "", [
                new AppMenuItem(
                    "OrganizationUnits",
                    "Pages.Administration.OrganizationUnits",
                    "flaticon-map",
                    "/app/admin/organization-units"
                ),
                new AppMenuItem(
                    "Roles",
                    "Pages.Administration.Roles",
                    "flaticon-suitcase",
                    "/app/admin/roles"
                ),
                new AppMenuItem(
                    "Users",
                    "Pages.Administration.Users",
                    "flaticon-users",
                    "/app/admin/users"
                ),
                new AppMenuItem(
                    "Languages",
                    "Pages.Administration.Languages",
                    "flaticon-tabs",
                    "/app/admin/languages"
                ),
                new AppMenuItem(
                    "AuditLogs",
                    "Pages.Administration.AuditLogs",
                    "flaticon-folder-1",
                    "/app/admin/auditLogs"
                ),
                new AppMenuItem(
                    "Maintenance",
                    "Pages.Administration.Host.Maintenance",
                    "flaticon-lock",
                    "/app/admin/maintenance"
                ),
                new AppMenuItem(
                    "Subscription",
                    "Pages.Administration.Tenant.SubscriptionManagement",
                    "flaticon-refresh",
                    "/app/admin/subscription-management"
                ),
                new AppMenuItem(
                    "VisualSettings",
                    "Pages.Administration.UiCustomization",
                    "flaticon-medical",
                    "/app/admin/ui-customization"
                ),
                new AppMenuItem(
                    "Settings",
                    "Pages.Administration.Host.Settings",
                    "flaticon-settings",
                    "/app/admin/hostSettings"
                ),
                new AppMenuItem(
                    "Settings",
                    "Pages.Administration.Tenant.Settings",
                    "flaticon-settings",
                    "/app/admin/tenantSettings"
                ),
            ]),
            new AppMenuItem(
                "DemoUiComponents",
                "Pages.DemoUiComponents",
                "flaticon-shapes",
                "/app/admin/demo-ui-components"
            ),
        ]);
    }

    checkChildMenuItemPermission(menuItem): boolean {
        for (let i = 0; i < menuItem.items.length; i++) {
            let subMenuItem = menuItem.items[i];

            if (
                subMenuItem.permissionName &&
                this._permissionCheckerService.isGranted(
                    subMenuItem.permissionName
                )
            ) {
                return true;
            } else if (subMenuItem.items && subMenuItem.items.length) {
                return this.checkChildMenuItemPermission(subMenuItem);
            }
        }

        return false;
    }

    showMenuItem(menuItem: AppMenuItem): boolean {
        if (
            menuItem.permissionName ===
                "Pages.Administration.Tenant.SubscriptionManagement" &&
            this._appSessionService.tenant &&
            !this._appSessionService.tenant.edition
        ) {
            return false;
        }

        let hideMenuItem = false;

        if (menuItem.requiresAuthentication && !this._appSessionService.user) {
            hideMenuItem = true;
        }

        if (
            menuItem.permissionName &&
            !this._permissionCheckerService.isGranted(menuItem.permissionName)
        ) {
            hideMenuItem = true;
        }

        if (
            this._appSessionService.tenant ||
            !abp.multiTenancy.ignoreFeatureCheckForHostUsers
        ) {
            if (
                menuItem.hasFeatureDependency() &&
                !menuItem.featureDependencySatisfied()
            ) {
                hideMenuItem = true;
            }
        }

        if (!hideMenuItem && menuItem.items && menuItem.items.length) {
            return this.checkChildMenuItemPermission(menuItem);
        }

        return !hideMenuItem;
    }
}
