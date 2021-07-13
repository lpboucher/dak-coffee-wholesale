import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";

import { ModalService } from "@core/views/modal.service";

import { VolumeSelectionModalComponent } from "@shared/components/modals";

@Component({
    selector: "app-backbone",
    templateUrl: "./backbone.page.html",
    styleUrls: ["./backbone.page.scss"]
})
export class BackbonePageComponent implements OnDestroy {
    showSidebar: boolean = false;
    private subscriptions: Subscription = new Subscription();

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: ModalService<VolumeSelectionModalComponent>,
    ) {
        this.subscriptions.add(
            this.activatedRoute.queryParams.subscribe(
                (params: Params) => {
                    if (params["checkPricing"] === "true") {
                        this.modalService.open(VolumeSelectionModalComponent);

                        const { checkPricing, ...newParams } = params;
                        this.router.navigate([], { queryParams: newParams });
                    }
                }
            )
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onShowSidebar(): void {
        this.showSidebar = true;
    }

    onHideSidebar(): void {
        this.showSidebar = false;
    }
}
