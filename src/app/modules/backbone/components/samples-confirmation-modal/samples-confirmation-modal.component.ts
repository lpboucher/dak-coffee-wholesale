import { Component, ViewChild } from "@angular/core";
import { ModalBackboneComponent } from "@app/shared/components/modals/backbone/modal-backbone.component";

@Component({
    selector: "app-samples-confirmation-modal",
    templateUrl: "./samples-confirmation-modal.component.html",
    styleUrls: ["./samples-confirmation-modal.component.scss"]
})
export class SamplesConfirmationModalComponent {
    @ViewChild("modal") modal: ModalBackboneComponent | undefined = undefined;

    constructor() { }

    onCancel(): void {
        console.log("Modal cancelled.");
        this.close();
    }

    onConfirm(): void {
        console.log("Modal confirmed.");
        this.close();
    }

    private close(): void {
        if (this.modal != undefined) {
            this.modal.close();
        }
    }
}
