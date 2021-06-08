import { Component } from "@angular/core";
import { ModalService } from "@app/core/modals/modal.service";
import { ModalComponent } from "@shared/components/modal/modal.component";

@Component({
    selector: "app-samples-confirmation-modal",
    templateUrl: "./samples-confirmation-modal.component.html",
    styleUrls: ["./samples-confirmation-modal.component.scss"]
})
export class SamplesConfirmationModalComponent extends ModalComponent {
    display = true;

    constructor(protected modalService: ModalService<SamplesConfirmationModalComponent>) {
        super();
    }

    onCancel(): void {
        console.log("Modal cancelled.");
        this.close();
    }

    onConfirm(): void {
        console.log("Modal confirmed.");
        this.close();
    }
}
