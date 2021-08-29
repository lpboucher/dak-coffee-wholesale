import { NewUser } from "./new-user.class";

export class ExistingUser extends NewUser {
    walletValue?: number = 0;
    lastOrderDate?: Date;

    constructor(existingUserShape?: Partial<ExistingUser>) {
        super(existingUserShape);

        if (existingUserShape != null) {
            if (existingUserShape.walletValue != null) {
                this.walletValue = existingUserShape.walletValue;
            }

            if (existingUserShape.lastOrderDate != null) {
                this.lastOrderDate = new Date(existingUserShape.lastOrderDate);
            }
        }
    }
}
