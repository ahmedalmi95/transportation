import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { BusInfosServiceProxy, CreateOrEditBusInfoDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditBusInfoModal',
    templateUrl: './create-or-edit-busInfo-modal.component.html'
})
export class CreateOrEditBusInfoModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    busInfo: CreateOrEditBusInfoDto = new CreateOrEditBusInfoDto();



    constructor(
        injector: Injector,
        private _busInfosServiceProxy: BusInfosServiceProxy
    ) {
        super(injector);
    }

    show(busInfoId?: number): void {

        if (!busInfoId) {
            this.busInfo = new CreateOrEditBusInfoDto();
            this.busInfo.id = busInfoId;
            this.busInfo.insuPolicyNumber = moment().startOf('day');

            this.active = true;
            this.modal.show();
        } else {
            this._busInfosServiceProxy.getBusInfoForEdit(busInfoId).subscribe(result => {
                this.busInfo = result.busInfo;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
			
            this._busInfosServiceProxy.createOrEdit(this.busInfo)
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
