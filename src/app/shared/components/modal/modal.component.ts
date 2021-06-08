import { Component, Input } from "@angular/core";

import { ModalService } from "@core/modals/modal.service";

@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"]
})
export abstract class ModalComponent {
    protected abstract modalService: ModalService<ModalComponent>;
    @Input() display: boolean = true;

    constructor() { }

    protected async close(): Promise<void> {
        this.display = false;

        setTimeout(async () => {
            await this.modalService.close();
        }, 300);
    }
}
