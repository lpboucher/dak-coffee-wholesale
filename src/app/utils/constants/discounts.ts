export const CART_WEIGHT_THRESHOLD: number = 5.0;

export const NO_VOLUME_DISCOUNT: number = 0.3;
export const LARGE_VOLUME_DISCOUNT: number = 0.45;

export const INACTIVE_DISCOUNT_REDUCTION: number = (1 - NO_VOLUME_DISCOUNT);
export const ACTIVE_DISCOUNT_REDUCTION: number = (1 - LARGE_VOLUME_DISCOUNT);
