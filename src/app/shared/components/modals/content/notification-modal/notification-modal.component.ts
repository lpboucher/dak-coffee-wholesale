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

    get userEmail(): string {
        return this.authService.userEmail;
    }

    constructor(
        private alertService: AlertService,
        private messageService: CommunicationApiService,
        private authService: AuthService,
        private notificationService: CommunicationApiService,
    ) {}

    onCancel(): void {
        this.notificationService.resetProductName();
        this.close();
    }

    onConfirm(): void {
        this.messageService.sendMessage(
            this.authService.userEmail,
            "product-notification",
            this.notificationService.productNameForNotification
        )
            .subscribe(
                (_) => {
                    this.alertService.success("Thank you! We will notify you when this product is available!");
                    this.notificationService.resetProductName();
                    this.close();
                },
                (err) => {
                    console.log(err);
                    this.notificationService.resetProductName();
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
