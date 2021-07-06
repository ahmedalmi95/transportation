import {
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from "@angular/core";
import { NotifyService } from "@abp/notify/notify.service";
import { VehiclesServiceService } from "./vehicles-sevice/vehicles-service.service";
import { ModalDirective } from "ngx-bootstrap";

@Component({
    selector: "app-vehicles",
    templateUrl: "./vehicles.component.html",
    styleUrls: ["./vehicles.component.css"],
})
export class VehiclesComponent implements OnInit {
    @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    showModal = false;
    filterText;
    vehicles: Array<any> = [];
    vehicle: any;
    vehicleId: any;
    constructor(
        private notify: NotifyService,
        private vehiclesServiceService: VehiclesServiceService
    ) {}

    ngOnInit() {
        // this.notify.success("SuccessfullyDeleted");
        this.vehiclesServiceService.getAllVehicles().subscribe((res) => {
            console.log("res:", res);
            this.vehicles = res.result.items;
        });
    }

    getVehcalies() {}

    // l(msg){
    //   console.log(msg)
    // }

    getVehicleById(id) {
        console.log(id);
        this.vehiclesServiceService.getVehicleById(id).subscribe((res) => {
            // this.ViewVehicleModal.show(record)
            this.vehicle = res.result.vehicles;
            this.vehicleId = res.result.vehicles.id;
            console.log("this is the response:", this.vehicle);
        });
        this.show();
        // (click)="show()"
    }

    show(): void {
        // this.item = item;
        // this.active = true;
        // this.modal.show();
        this.showModal = true;
    }

    close(): void {
        // this.active = false;
        console.log("close");
        // this.modal.hide();
        this.showModal = false;
    }
    submitForm(vehicle) {
        console.log(vehicle);
        const obj = { ...vehicle, id: this.vehicleId };
        console.log("obj", obj);
        this.vehiclesServiceService
            .createOrEditVehcile(obj)
            .subscribe((res) => this.notify.success("Successfully"));
    }
}
