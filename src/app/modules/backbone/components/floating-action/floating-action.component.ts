import { Component } from "@angular/core";

import { ModalService } from "@core/views/modal.service";

import { SamplesConfirmationModalComponent } from "@shared/components/modals";

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
