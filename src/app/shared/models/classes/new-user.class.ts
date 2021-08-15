import { CreatedSnipcartCustomer } from "../interfaces/created-snipcart-customer.interface";
import { NewCustomer } from "./new-customer.class";

export class NewUser extends NewCustomer implements CreatedSnipcartCustomer {
    snipcartCustomerId!: string;
    snipcartSessionToken!: string;

    constructor(newUserShape?: Partial<NewUser>) {
        super(newUserShape);

        if (newUserShape != null) {
            if (newUserShape.snipcartCustomerId != null) {
                this.snipcartCustomerId = newUserShape.snipcartCustomerId;
            }

            if (newUserShape.snipcartSessionToken != null) {
                this.snipcartSessionToken = newUserShape.snipcartSessionToken;
            }
        }
    }
}
