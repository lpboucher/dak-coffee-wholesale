import { Component, ViewChild } from "@angular/core";
import { ModalComponent } from "@shared/components/modal/modal.component";

@Component({
    selector: "app-wallet-modal",
    templateUrl: "./wallet-modal.component.html",
    styleUrls: ["./wallet-modal.component.scss"]
})
export class WalletModalComponent {
    @ViewChild("modal") modal: ModalComponent | undefined;

    constructor() { }

    onOk(): void {
        if (this.modal != null) {
            this.modal.close();
        }
    }
}
