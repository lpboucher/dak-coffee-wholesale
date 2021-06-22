import { Component } from "@angular/core";

import { ModalService } from "@app/core/views/modal.service";

import { SamplesConfirmationModalComponent } from "@shared/components/modals/content/samples-confirmation-modal/samples-confirmation-modal.component";

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
