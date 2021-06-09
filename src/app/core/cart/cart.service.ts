import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, fromEvent, Observable, Subscription } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CartService implements OnDestroy {
    private static readonly REFRESH_RATE: number = 1000;

    private subscriptions: Subscription = new Subscription();
    private cartTotal$: BehaviorSubject<number> = new BehaviorSubject(0);
    cartWeight$: Observable<number> = new Observable();

    get currentCartTotal$(): Observable<number> {
        return this.cartTotal$.asObservable();
    }

    constructor() {
        this.subscriptions.add(
            fromEvent(document, "snipcart.ready")
            .subscribe(_ => {
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
        this.updateCartTotal();
        console.log(`Adding: ${ item }`);
    }

    addedItem(item: any) {
        this.updateCartTotal();
        console.log(`Added: ${ item }`);
    }

    updatedItem(item: any) {
        this.updateCartTotal();
        console.log(`Updated: ${ item }`);
    }

    removedItem(item: any) {
        this.updateCartTotal();
        console.log(`Removed: ${ item }`);
    }

    orderCompleted(cart: any) {
        this.updateCartTotal();
        console.log(`Order completed: ${ cart }`);
    }

    updateCartTotal(): void {
        setTimeout(() => {
            this.cartTotal$.next(this.currentCart.total);
        });
    }

    private get currentCart(): any {
        return (window as any).Snipcart.store.getState().cart;
    }

    private evaluateCartWeight(): number {
        const cartItems = this.currentCart.items.items;
        return cartItems
            .filter((item: any) => item?.dimensions?.weight != null && item?.quantity != null)
            .reduce((sum: number, item: any) => sum + (item.dimensions.weight * item.quantity), 0);
    }
}
