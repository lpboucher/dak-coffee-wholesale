import { Component, ViewChild } from "@angular/core";

import { ModalBackboneComponent } from "@shared/components/modals";

@Component({
    selector: "app-notification-modal",
    templateUrl: "./notification-modal.component.html",
    styleUrls: ["./notification-modal.component.scss"]
})
export class NotificationModalComponent {
    @ViewChild("modal") modal: ModalBackboneComponent | undefined;

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
