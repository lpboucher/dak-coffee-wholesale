import { Component, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";

import { ModalComponent } from "@app/shared/components/modal/modal.component";

@Component({
    selector: "app-samples-confirmation-modal",
    templateUrl: "./samples-confirmation-modal.component.html",
    styleUrls: ["./samples-confirmation-modal.component.scss"]
})
export class SamplesConfirmationModalComponent {
    @ViewChild("modal") modal: ModalComponent | undefined = undefined;
    selectionOptions: string[] = ["Filter", "Espresso", "Both"];
    submissionAttempted: boolean = false;
    selectionForm = this.fb.group({
        selection: new FormControl("", Validators.required),
    });

    constructor(private fb: FormBuilder) { }

    onCancel(): void {
        this.close();
    }

    onConfirm(): void {
        this.submissionAttempted = true;

        if (this.selectionForm.valid) {
            console.log(this.selectionForm.get("selection")!.value);
            this.close();
        }
    }

    private close(): void {
        if (this.modal != undefined) {
            this.modal.close();
        }
    }
}
