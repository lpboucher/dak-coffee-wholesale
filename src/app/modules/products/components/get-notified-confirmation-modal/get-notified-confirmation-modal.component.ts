import { Component, ViewChild } from "@angular/core";
import { ModalComponent } from "@shared/components/modal/modal.component";

@Component({
    selector: "app-get-notified-confirmation-modal",
    templateUrl: "./get-notified-confirmation-modal.component.html",
    styleUrls: ["./get-notified-confirmation-modal.component.scss"]
})
export class GetNotifiedConfirmationModalComponent {
    @ViewChild("modal") modal: ModalComponent | undefined;

    constructor() {}

    onCancel(): void {
        this.close();
    }

    onConfirm(): void {
        this.close();
    }

    private close(): void {
        if (this.modal != null) {
            this.modal.close();
        }
    }
}
