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
    cartEvents!: SnipcartEvents;

    constructor(
        private snipcartService: SnipcartService,
    ) {
        this.subscriptions.add(fromEvent(document, "snipcart.ready")
            .subscribe(_ => {
                // this.cartEvents.addingItemSubscription();
                this.cartEvents.addedItemSubscription = this.snipcartService.addItemAddingListener();
                // this.cartEvents.updatedItemSubscription();
                // this.cartEvents.removedItemSubscription();
                // this.cartEvents.orderCompletedSubscription();
            })
        );
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.cartEvents.addingItemSubscription();
        this.cartEvents.addedItemSubscription();
        this.cartEvents.updatedItemSubscription();
        this.cartEvents.removedItemSubscription();
        this.cartEvents.orderCompletedSubscription();
    }
}
