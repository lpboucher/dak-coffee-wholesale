import { Component, ViewChild } from "@angular/core";
import { ModalComponent } from "@app/shared/components/modal/modal.component";

@Component({
    selector: "app-samples-confirmation-modal",
    templateUrl: "./samples-confirmation-modal.component.html",
    styleUrls: ["./samples-confirmation-modal.component.scss"]
})
export class SamplesConfirmationModalComponent {
    @ViewChild("modal") modal: ModalComponent | undefined = undefined;
    selectionOptions: string[] = ["Filter", "Espresso", "Both"];
    selection: string | undefined;
    submissionAttempted: boolean = false;

    constructor() { }

    onSelection(selection: string): void {
        this.selection = selection;
    }

    onCancel(): void {
        this.close();
    }

    onConfirm(): void {
        this.submissionAttempted = true;

        if (this.selection != undefined) {
            console.log(this.selection);
            this.close();
        }
    }

    private close(): void {
        if (this.modal != undefined) {
            this.modal.close();
        }
    }
}
