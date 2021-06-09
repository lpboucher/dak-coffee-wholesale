import { Injectable, OnDestroy } from "@angular/core";
import { fromEvent, Observable, Subscription } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CartService implements OnDestroy {
    private static readonly REFRESH_RATE: number = 1000;

    private subscriptions: Subscription = new Subscription();
    private snipcart: any = {};
    cartTotal$: Observable<number> = new Observable();
    cartWeight$: Observable<number> = new Observable();

    constructor() {
        this.subscriptions.add(
            fromEvent(document, "snipcart.ready")
            .subscribe(_ => {
                this.snipcart = (window as any).Snipcart;

                this.cartTotal$ = new Observable(subscriber => {
                    setInterval(() =>
                        subscriber.next(this.snipcart.store.getState().cart.total),
                        CartService.REFRESH_RATE)
                });

                this.cartWeight$ = new Observable(subscriber => {
                    setInterval(() =>
                        subscriber.next(this.evaluateCartWeight()),
                        CartService.REFRESH_RATE)
                });
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    addingItem(item: any) {
        console.log(`Adding: ${ item }`);
    }

    addedItem(item: any) {
        console.log(`Added: ${ item }`);
    }

    updatedItem(item: any) {
        console.log(`Updated: ${ item }`);
    }

    removedItem(item: any) {
        console.log(`Removed: ${ item }`);
    }

    orderCompleted(cart: any) {
        console.log(`Order completed: ${ cart }`);
    }

    private evaluateCartWeight(): number {
        const cartItems = this.snipcart.store.getState().cart.items.items;
        return cartItems
            .filter((item: any) => item?.dimensions?.weight != null && item?.quantity != null)
            .reduce((sum: number, item: any) => sum + (item.dimensions.weight * item.quantity), 0);
    }
}
