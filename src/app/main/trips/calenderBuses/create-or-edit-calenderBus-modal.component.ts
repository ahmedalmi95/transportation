import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { CalenderBusesServiceProxy, CreateOrEditCalenderBusDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditCalenderBusModal',
    templateUrl: './create-or-edit-calenderBus-modal.component.html'
})
export class CreateOrEditCalenderBusModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', {static: true}) modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    calenderBus: CreateOrEditCalenderBusDto = new CreateOrEditCalenderBusDto();

            start_date: Date;
            end_date: Date;


    constructor(
        injector: Injector,
        private _calenderBusesServiceProxy: CalenderBusesServiceProxy
    ) {
        super(injector);
    }

    show(calenderBusId?: number): void {
this.start_date = null;
this.end_date = null;

        if (!calenderBusId) {
            this.calenderBus = new CreateOrEditCalenderBusDto();
            this.calenderBus.id = calenderBusId;

            this.active = true;
            this.modal.show();
        } else {
            this._calenderBusesServiceProxy.getCalenderBusForEdit(calenderBusId).subscribe(result => {
                this.calenderBus = result.calenderBus;

                if (this.calenderBus.start_date) {
					this.start_date = this.calenderBus.start_date.toDate();
                }
                if (this.calenderBus.end_date) {
					this.end_date = this.calenderBus.end_date.toDate();
                }

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
			
        if (this.start_date) {
            if (!this.calenderBus.start_date) {
                this.calenderBus.start_date = moment(this.start_date).startOf('day');
            }
            else {
                this.calenderBus.start_date = moment(this.start_date);
            }
        }
        else {
            this.calenderBus.start_date = null;
        }
        if (this.end_date) {
            if (!this.calenderBus.end_date) {
                this.calenderBus.end_date = moment(this.end_date).startOf('day');
            }
            else {
                this.calenderBus.end_date = moment(this.end_date);
            }
        }
        else {
            this.calenderBus.end_date = null;
        }
            this._calenderBusesServiceProxy.createOrEdit(this.calenderBus)
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
