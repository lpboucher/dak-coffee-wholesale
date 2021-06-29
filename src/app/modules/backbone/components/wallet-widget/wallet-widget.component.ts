import { Component } from "@angular/core";

import { ModalService } from "@core/views/modal.service";

import { WalletModalComponent } from "@shared/components/wallet-modal/wallet-modal.component";

@Component({
    selector: "app-wallet-widget",
    templateUrl: "./wallet-widget.component.html",
    styleUrls: ["./wallet-widget.component.scss"]
})
export class WalletWidgetComponent {
    constructor(private modalService: ModalService<WalletModalComponent>) {}

    onWalletWidgetClick(): void {
        this.modalService.open(WalletModalComponent);
    }
}
