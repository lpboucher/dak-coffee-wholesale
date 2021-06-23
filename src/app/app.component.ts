import { Component, OnDestroy, OnInit } from "@angular/core";
import { fromEvent, Subscription } from "rxjs";

import { SnipcartService } from "@core/cart/snipcart.service";
import { SnipcartEvents, defaultSnipcartEvents } from "@shared/models/types/snipcart-events.type";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription = new Subscription();
    title = "dak-wholesale";
    cartEvents: SnipcartEvents = defaultSnipcartEvents();

    constructor(
        private snipcartService: SnipcartService,
    ) {
        this.subscriptions.add(fromEvent(document, "snipcart.ready")
            .subscribe(_ => {
                this.cartEvents.snipcartInitializedSubscription = this.snipcartService.initialiseCartService();
                this.cartEvents.addingItemSubscription = this.snipcartService.addItemAddingListener();
                this.cartEvents.addedItemSubscription = this.snipcartService.addItemAddedListener();
                this.cartEvents.updatedItemSubscription = this.snipcartService.addItemUpdatedListener();
                this.cartEvents.removedItemSubscription = this.snipcartService.addItemRemovedListener();
                this.cartEvents.orderCompletedSubscription = this.snipcartService.addOrderCompletedListener();
            })
        );
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.cartEvents.snipcartInitializedSubscription();
        this.cartEvents.addingItemSubscription();
        this.cartEvents.addedItemSubscription();
        this.cartEvents.updatedItemSubscription();
        this.cartEvents.removedItemSubscription();
        this.cartEvents.orderCompletedSubscription();
    }
}
