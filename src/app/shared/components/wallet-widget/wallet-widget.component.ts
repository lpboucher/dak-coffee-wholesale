import { Component, OnInit } from "@angular/core";

import { ModalService } from "@app/core/views/modal.service";
import { WalletModalComponent } from "@shared/components/wallet-modal/wallet-modal.component";

@Component({
    selector: "app-wallet-widget",
    templateUrl: "./wallet-widget.component.html",
    styleUrls: ["./wallet-widget.component.scss"]
})
export class WalletWidgetComponent implements OnInit {

    constructor(private modalService: ModalService<WalletModalComponent>) { }

    ngOnInit(): void {
    }

    onClick(): void {
        this.modalService.open(WalletModalComponent);
    }
}
