import { Component } from "@angular/core";

import { ModalService } from "@core/modals/modal.service";

@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"]
})
export class ModalComponent {
    display: boolean = true;

    constructor(private modalService: ModalService<ModalComponent>) { }

    async close(): Promise<void> {
        this.display = false;

        setTimeout(async () => {
            await this.modalService.close();
        }, 300);
    }
}
