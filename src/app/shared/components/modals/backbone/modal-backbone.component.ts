import { Component } from "@angular/core";

import { ModalService } from "@core/views/modal.service";

@Component({
    selector: "app-modal-backbone",
    templateUrl: "./modal-backbone.component.html",
    styleUrls: ["./modal-backbone.component.scss"]
})
export class ModalBackboneComponent {
    display: boolean = true;

    constructor(private modalService: ModalService<ModalBackboneComponent>) { }

    async close(): Promise<void> {
        this.display = false;

        setTimeout(async () => {
            await this.modalService.close();
        }, 300);
    }
}
