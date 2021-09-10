import { Component, ViewChild } from "@angular/core";

import { AlertService } from "@core/alerts/alert.service";
import { AuthService } from "@core/authentication/authentication.service";
import { CommunicationApiService } from "@core/communication/communication.service";

import { ModalBackboneComponent } from "@shared/components/modals";

@Component({
    selector: "app-notification-modal",
    templateUrl: "./notification-modal.component.html",
    styleUrls: ["./notification-modal.component.scss"]
})
export class NotificationModalComponent {
    @ViewChild("modal") modal: ModalBackboneComponent | undefined;

    constructor(
        private alertService: AlertService,
        private messageService: CommunicationApiService,
        private authService: AuthService,
    ) {}

    onCancel(): void {
        this.close();
    }

    onConfirm(): void {
        // TODO pass the product name to the modal, to figure out which product client is interested in
        this.messageService.sendMessage(this.authService.userEmail, "product-notification")
            .subscribe(
                (_) => {
                    this.alertService.success("Thank you! We will notify you when this product is available!");
                    this.close();
                },
                (err) => {
                    console.log(err);
                    this.alertService.error("Oups, maybe check with info@dakcoffeeroasters.com");
                },
            );
    }

    private close(): void {
        if (this.modal != null) {
            this.modal.close();
        }
    }
}
