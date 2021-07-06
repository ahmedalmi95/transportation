import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { RoutesServiceProxy, CreateOrEditRouteDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditRouteModal',
    templateUrl: './create-or-edit-route-modal.component.html'
})
export class CreateOrEditRouteModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    route: CreateOrEditRouteDto = new CreateOrEditRouteDto();



    constructor(
        injector: Injector,
        private _routesServiceProxy: RoutesServiceProxy
    ) {
        super(injector);
    }

    show(routeId?: number): void {

        if (!routeId) {
            this.route = new CreateOrEditRouteDto();
            this.route.id = routeId;

            this.active = true;
            this.modal.show();
        } else {
            this._routesServiceProxy.getRouteForEdit(routeId).subscribe(result => {
                this.route = result.route;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
			
            this._routesServiceProxy.createOrEdit(this.route)
             .pipe(finalize(() => { this.saving = false; }))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }







    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
