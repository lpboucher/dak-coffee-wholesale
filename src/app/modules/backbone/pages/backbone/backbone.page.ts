import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ModalService } from "@core/views/modal.service";

import { VolumeSelectionModalComponent } from "@shared/components/modals";

@Component({
    selector: "app-backbone",
    templateUrl: "./backbone.page.html",
    styleUrls: ["./backbone.page.scss"]
})
export class BackbonePageComponent implements OnInit {
    showSidebar: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private modalService: ModalService<VolumeSelectionModalComponent>,
    ) { }

    ngOnInit(): void {
        /*const doCheckPricing = this.route.snapshot.queryParams["checkPricing"];

        if (doCheckPricing) {
            this.modalService.open(VolumeSelectionModalComponent);
        }*/
    }

    onShowSidebar(): void {
        this.showSidebar = true;
    }

    onHideSidebar(): void {
        this.showSidebar = false;
    }
}
