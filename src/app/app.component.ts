import { Component, OnDestroy, OnInit } from "@angular/core";
import { fromEvent, Subscription } from "rxjs";

import { SnipcartService } from "@core/cart/snipcart.service";
import { SnipcartEvents } from "@shared/models/types/snipcart-events.type";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription = new Subscription();
    title = "dak-wholesale";
    cartEvents?: SnipcartEvents;

    constructor(private snipcartService: SnipcartService) { }

    ngOnInit(): void {
        this.subscriptions.add(fromEvent(document, "snipcart.ready")
            .subscribe(_ => {
                this.cartEvents = {
                    cartStateListener: this.snipcartService.cartStateListener(),
                    addingItemSubscription: this.snipcartService.addItemAddingListener(),
                    addedItemSubscription: this.snipcartService.addItemAddedListener(),
                    updatedItemSubscription: this.snipcartService.addItemUpdatedListener(),
                    removedItemSubscription: this.snipcartService.addItemRemovedListener(),
                    orderCompletedSubscription: this.snipcartService.addOrderCompletedListener(),
                }
            })
        );
    }

    ngOnDestroy(): void {
        if (this.cartEvents == null) { return; }

        this.cartEvents.cartStateListener();
        this.cartEvents.addingItemSubscription();
        this.cartEvents.addedItemSubscription();
        this.cartEvents.updatedItemSubscription();
        this.cartEvents.removedItemSubscription();
        this.cartEvents.orderCompletedSubscription();

        this.subscriptions.unsubscribe();
    }
}
