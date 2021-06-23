import { Component, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { ModalComponent } from "@shared/components/modal/modal.component";
import { Roast } from "@shared/models/types/roast.type";

@Component({
    selector: "app-samples-confirmation-modal",
    templateUrl: "./samples-confirmation-modal.component.html",
    styleUrls: ["./samples-confirmation-modal.component.scss"]
})
export class SamplesConfirmationModalComponent {
    @ViewChild("modal") modal: ModalComponent | undefined;
    selectionOptions: Roast[] = ["Filter", "Espresso", "Both"];
    submissionAttempted: boolean = false;
    sampleSelectionForm = this.fb.group({
        selection: ["", Validators.required],
    });

    constructor(private fb: FormBuilder) { }

    onCancel(): void {
        this.close();
    }

    onConfirm(): void {
        this.submissionAttempted = true;

        if (this.sampleSelectionForm.valid) {
            this.close();
        }
    }

    private close(): void {
        if (this.modal != null) {
            this.modal.close();
        }
    }
}
