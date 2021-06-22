import { Component, ViewChild } from "@angular/core";
import { ModalBackboneComponent } from "@shared/components/modals";

@Component({
    selector: "app-wallet-modal",
    templateUrl: "./wallet-modal.component.html",
    styleUrls: ["./wallet-modal.component.scss"]
})
export class WalletModalComponent {
    @ViewChild("modal") modal: ModalBackboneComponent | undefined;

    constructor() { }

    onOk(): void {
        if (this.modal != null) {
            this.modal.close();
        }
    }
}