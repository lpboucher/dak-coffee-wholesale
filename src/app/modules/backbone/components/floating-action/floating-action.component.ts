import { Component } from "@angular/core";

import { ModalService } from "@core/modals/modal.service";

import { ModalComponent } from "@shared/components/modal/modal.component";

@Component({
    selector: "app-floating-action",
    templateUrl: "./floating-action.component.html",
    styleUrls: ["./floating-action.component.scss"]
})
export class FloatingActionComponent {

    constructor(private modalService: ModalService<ModalComponent>) { }

    async showModal(): Promise<void> {
        this.modalService.open(ModalComponent);
    }
}
