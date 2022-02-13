import { Component, ViewChild } from "@angular/core";
import { FormBuilder, Validators  } from "@angular/forms";

import { AlertService } from "@core/alerts/alert.service";
import { CommunicationApiService } from "@core/communication/communication.service";
import { AuthService } from "@core/authentication/authentication.service";

import { ModalBackboneComponent } from "@shared/components/modals";

import { SamplesRoast } from "@shared/models/types/roast.type";

@Component({
    selector: "app-samples-confirmation-modal",
    templateUrl: "./samples-confirmation-modal.component.html",
    styleUrls: ["./samples-confirmation-modal.component.scss"]
})
export class SamplesConfirmationModalComponent {
    @ViewChild("modal") modal: ModalBackboneComponent | undefined = undefined;
    selectionOptions: SamplesRoast[] = ["filter", "espresso", "Both"];
    submissionAttempted: boolean = false;
    sampleSelectionForm = this.fb.group({
        selection: ["", Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        private alertService: AlertService,
        private messageService: CommunicationApiService,
        private authService: AuthService,
    ) {}

    onCancel(): void {
        this.close();
    }

    onConfirm(): void {
        this.submissionAttempted = true;

        if (this.sampleSelectionForm.valid) {
            this.messageService.sendMessage(
                this.authService.userEmail,
                "sample-request",
                this.sampleSelectionForm.get("selection")?.value,
            )
                .subscribe(
                    (_) => {
                        this.alertService.success("Thank you! We will process your request");
                        this.close();
                    },
                    (err) => {
                        console.log(err);
                        this.alertService.error("Oups, maybe check with info@dakcoffeeroasters.com");
                    },
                );
        }
    }

    private close(): void {
        if (this.modal != null) {
            this.modal.close();
        }
    }
}
