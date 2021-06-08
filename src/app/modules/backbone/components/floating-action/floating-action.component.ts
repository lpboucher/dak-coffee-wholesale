import { Component } from "@angular/core";

import { ModalService } from "@core/modals/modal.service";

import { SamplesConfirmationModalComponent } from "@modules/backbone/components/samples-confirmation-modal/samples-confirmation-modal.component";

@Component({
    selector: "app-floating-action",
    templateUrl: "./floating-action.component.html",
    styleUrls: ["./floating-action.component.scss"]
})
export class FloatingActionComponent {

    constructor(private modalService: ModalService<SamplesConfirmationModalComponent>) { }

    async showModal(): Promise<void> {
        this.modalService.open(SamplesConfirmationModalComponent);
    }
}
