type SnipcartItemEventType = "item.adding" | "item.added" | "item.updated" | "item.removed";
type SnipcartCartEventType = "cart.created" | "cart.confirmed";
type SnipcartCustomerEventType = "customer.registered" | "customer.signedin" | "customer.signedout";
type SnipcartMetaEventType = "language.updated" | "snipcart.initialized" | "snipcart.initialization.failed";

export type SnipcartEventType = SnipcartItemEventType | SnipcartCartEventType | SnipcartCustomerEventType | SnipcartMetaEventType;

export type SnipcartEvents = {
    addingItemSubscription: () => {},
    addedItemSubscription: () => {},
    updatedItemSubscription: () => {},
    removedItemSubscription: () => {},
    orderCompletedSubscription: () => {}
};