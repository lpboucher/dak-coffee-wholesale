import { Component } from "@angular/core";

import { ModalService } from "@core/modals/modal.service";

@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"]
})
export class ModalComponent {
    display = true;

    constructor(private modalService: ModalService<ModalComponent>) { }

    onCancel(): void {
        console.log("Modal cancelled.");
        this.close();
    }

    onConfirm(): void {
        console.log("Modal confirmed.");
        this.close();
    }

    private async close(): Promise<void> {
        this.display = false;

        setTimeout(async () => {
            await this.modalService.close();
        }, 300);
    }
}
